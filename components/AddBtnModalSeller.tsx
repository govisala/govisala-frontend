import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Platform,
  ActivityIndicator,
  Alert as Alt,
} from "react-native";
import { Box } from "./ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Center } from "./ui/center";
import { BlurView } from "expo-blur";
import { InputField, Input } from "./ui/input";
import { Button, ButtonText } from "./ui/button";
import * as ImagePicker from "expo-image-picker";
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserDataContext } from "@/components/context/UserDataContext";

interface SellerListingFormData {
  ItemName: string;
  Quantity: string;
  Quality: string;
  Location: string;
  Area: string;
  HarvestDate: string;
  UnitPrice: string;
  Addi: string;
  UserId: string;
}

// Function to submit the Seller listing form
const submitSellerListing = async (
  formData: SellerListingFormData,
  images: string[]
) => {
  try {
    // Create a FormData object for multipart/form-data submission (for images)
    const data = new FormData();

    // Add all form fields to FormData
    data.append("ItemName", formData.ItemName);
    data.append("Quantity", formData.Quantity);
    data.append("Quality", formData.Quality);
    data.append("Location", formData.Location);
    data.append("Area", formData.Area);
    data.append("HarvestDate", formData.HarvestDate);
    data.append("UnitPrice", formData.UnitPrice);
    data.append("Addi", formData.Addi);
    data.append("UserId", formData.UserId);

    // Add images to FormData
    images.forEach((imageUri, index) => {
      // Extract filename from URI
      const filename = imageUri.split("/").pop() || `image${index}.jpg`;

      // Get file extension
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      // Create a Blob from the image URI
      const blob = {
        uri: imageUri,
        type,
        name: filename,
      } as unknown as Blob;

      // Append image to form data
      data.append("sellerListingImages", blob, filename);
    });

    // Set up axios instance with headers for multipart/form-data
    const API_URL = process.env.EXPO_PUBLIC_API_URL + "/seller"; // Replace with your API URL

    // Include authorization header if using auth
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // Make the API call

    const response = await axios.post(
      `${API_URL}/post-seller-listing`,
      data,
      config
    );

    // Return successful response
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error submitting Seller listing:", error);

    // Return error information
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

interface AddModalSellerProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const AddModalSeller: React.FC<AddModalSellerProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ItemName, setitemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Quality, setQuality] = useState("");
  const [Location, setLocation] = useState("");
  const [Area, setArea] = useState("");
  const [HarvestDate, setHarvestDate] = useState<string>("");
  const [UnitPrice, setUnitPrice] = useState("");
  const [Addi, setAddi] = useState("");
  const [images, setImages] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const { userData } = useContext(UserDataContext);

  const pickImage = async () => {
    // Request permissions first
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      // For multiple image selection
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selectedImages].slice(0, 5)); // Keep max 5 images
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Form validation function
  const validateForm = () => {
    if (!ItemName.trim()) return "Item name is required";
    if (!Quantity.trim()) return "Quantity is required";
    if (!Location.trim()) return "Location is required";
    if (!HarvestDate.trim()) return "Required date is required";

    const UnitPriceNum = parseFloat(UnitPrice);

    if (isNaN(UnitPriceNum)) return "Unit price must be a number";

    return null; // No validation errors
  };

  // Form submission handler
  const handleSubmit = async () => {
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError("Error: " + validationError);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
      return;
    }

    setIsSubmitting(true);

    // Prepare form data
    const formData = {
      ItemName,
      Quantity,
      Quality,
      Location,
      Area,
      HarvestDate,
      UnitPrice,
      Addi,
      UserId: userData.user_id,
    };

    try {
      const result = await submitSellerListing(formData, images);

      if (result.success) {
        // TODO: Add success alert
        Alt.alert(
          "Success",
          "Your Seller listing has been submitted. Need to wait for approval.",
          [
            {
              text: "OK",
              onPress: () => {
                // Reset form and close modal
                resetForm();
                setModalVisible(false);
              },
            },
          ]
        );
      } else {
        setError("Error: " + result.error || "Failed to submit your request");
        setErrorVisible(true);
        setTimeout(() => {
          setErrorVisible(false);
        }, 3000);
      }
    } catch (error) {
      setError("Error: Something went wrong. Please try again later.");
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setitemName("");
    setQuantity("");
    setQuality("");
    setLocation("");
    setArea("");
    setHarvestDate("");
    setUnitPrice("");
    setAddi("");
    setImages([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView>
        {datePickerVisible && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={HarvestDate ? new Date(HarvestDate) : new Date()}
            onChange={(event, date) => {
              if (date) {
                setHarvestDate(date.toISOString());
              }
            }}
          />
        )}
        <BlurView style={StyleSheet.absoluteFill} intensity={10} />

        <Box className="flex h-full bg-[#C0D85F] mt-24 rounded-t-3xl p-4">
          <TouchableOpacity
            className="absolute top-4 right-4"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <AntDesign name="close" size={30} color="#4E7456" />
          </TouchableOpacity>
          <Center>
            <Text className="text-center font-p600 text-3xl text-[#354040]">
              Add Seller Listing
            </Text>
          </Center>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 120,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Box className="flex bg-[#C0D85F] h-full rounded-t-[40px] px-4">
              <Center>
                <Input
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="Item Name"
                    value={ItemName}
                    onChangeText={(text) => setitemName(text)}
                    className="font-p400"
                  />
                </Input>

                <Input
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="Quantity (in kg)"
                    value={Quantity}
                    onChangeText={(text) => setQuantity(text)}
                    className="font-p400"
                  />
                </Input>

                <Input
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="Quality Grade (e.g. A, B, C)"
                    value={Quality}
                    onChangeText={(text) => setQuality(text)}
                    className="font-p400"
                  />
                </Input>

                <Input
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="Nearest Town/City"
                    value={Location}
                    onChangeText={(text) => setLocation(text)}
                    className="font-p400"
                  />
                </Input>

                <Input
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="District"
                    value={Area}
                    onChangeText={(text) => setArea(text)}
                    className="font-p400"
                  />
                </Input>

                <Input
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="Unit Price (in Rs.)"
                    value={UnitPrice}
                    onChangeText={(text) => setUnitPrice(text)}
                    className="font-p400"
                  />
                </Input>

                <Box className="flex flex-col w-full mt-4">
                  <Text className="font-p500 text-left text-2xl text-[#354040] mb-2">
                    Harvest Date
                  </Text>
                  <Box className="bg-[#FCFFE0] rounded-full p-3 items-center justify-center">
                    <DateTimePicker
                      value={HarvestDate ? new Date(HarvestDate) : new Date()}
                      mode="date"
                      onChange={(event, date) => {
                        if (date) {
                          setHarvestDate(date.toISOString().split("T")[0]);
                        }
                      }}
                    />
                  </Box>
                </Box>

                {/* Image Upload Section */}
                <Box className="flex flex-row w-full mt-6">
                  <Text className="font-p500 text-left text-2xl text-[#354040]">
                    Attach Images
                  </Text>
                </Box>

                {/* Image Preview */}
                <Box className="flex flex-row flex-wrap mt-2 w-full justify-start">
                  {images.map((image, index) => (
                    <Box key={index} className="relative m-1">
                      <Image
                        source={{ uri: image }}
                        style={{ width: 80, height: 80, borderRadius: 8 }}
                      />
                      <TouchableOpacity
                        onPress={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          right: -5,
                          top: -5,
                          backgroundColor: "#4E7456",
                          borderRadius: 12,
                          width: 24,
                          height: 24,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AntDesign name="close" size={16} color="#FCFFE0" />
                      </TouchableOpacity>
                    </Box>
                  ))}

                  {images.length < 5 && (
                    <TouchableOpacity
                      onPress={pickImage}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        backgroundColor: "#FCFFE0",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 4,
                        borderWidth: 1,
                        borderColor: "#4E7456",
                        borderStyle: "dashed",
                      }}
                    >
                      <AntDesign name="plus" size={24} color="#4E7456" />
                    </TouchableOpacity>
                  )}
                </Box>

                {/* Image Count */}
                {images.length > 0 && (
                  <Text className="text-right w-full text-sm text-[#354040] mt-1">
                    {images.length}/5 images
                  </Text>
                )}

                <Input
                  className="bg-[#FCFFE0] rounded-xl mt-8 h-32"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="Additional notes"
                    value={Addi}
                    onChangeText={(text) => setAddi(text)}
                    className="font-p400"
                    multiline={true}
                    numberOfLines={4}
                  />
                </Input>

                {errorVisible && (
                  <Alert
                    className="rounded-full mt-6"
                    action="error"
                    variant="solid"
                  >
                    <Ionicons
                      name="information-circle-outline"
                      size={28}
                      color="#a53333"
                    />
                    <AlertText className="font-p400" size="xl">
                      {error}
                    </AlertText>
                  </Alert>
                )}

                <Button
                  className="bg-[#4E7456] h-14 rounded-full mt-10"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FCFFE0" size="small" />
                  ) : (
                    <ButtonText className="font-p500 text-[#FCFFE0] text-2xl">
                      Add Request
                    </ButtonText>
                  )}
                </Button>
              </Center>
            </Box>
            <Box className="h-24" />
          </ScrollView>
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

export default AddModalSeller;

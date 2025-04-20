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
  KeyboardAvoidingView,
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

import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserDataContext } from "@/components/context/UserDataContext";
import DateTimePicker from "@react-native-community/datetimepicker";

interface BuyerRequestFormData {
  ItemName: string;
  Quantity: string;
  Quality: string;
  Location: string;
  Area: string;
  RequiredDate: string;
  BidFrom: string;
  BidTo: string;
  Addi: string;
  UserId: string;
}

// Function to submit the buyer request form
const submitBuyerRequest = async (
  formData: BuyerRequestFormData,
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
    data.append("RequiredDate", formData.RequiredDate);
    data.append("BidFrom", formData.BidFrom);
    data.append("BidTo", formData.BidTo);
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
      data.append("buyerReqImages", blob, filename);
    });

    // Set up axios instance with headers for multipart/form-data
    const API_URL = process.env.EXPO_PUBLIC_API_URL + "/buyer"; // Replace with your API URL

    // Include authorization header if using auth
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      `${API_URL}/post-buyer-request`,
      data,
      config
    );

    // Return successful response
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error submitting buyer request:", error);

    // Return error information
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

interface AddModalBuyerProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const AddModalBuyer: React.FC<AddModalBuyerProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ItemName, setitemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Quality, setQuality] = useState("");
  const [Location, setLocation] = useState("");
  const [Area, setArea] = useState("");
  const [RequiredDate, setReqiredDate] = useState("");
  const [BidFrom, setBidFrom] = useState("");
  const [BidTo, setBidTo] = useState("");
  const [Addi, setAddi] = useState("");
  const [images, setImages] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
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
    if (!RequiredDate.trim()) return "Required date is required";
    if (!BidFrom.trim() || !BidTo.trim()) return "Bid range is required";

    const bidFromNum = parseFloat(BidFrom);
    const bidToNum = parseFloat(BidTo);

    if (isNaN(bidFromNum) || isNaN(bidToNum))
      return "Bid values must be numbers";

    if (bidFromNum >= bidToNum)
      return "Bid to value must be greater than bid from value";

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
      RequiredDate,
      BidFrom,
      BidTo,
      Addi,
      UserId: userData.user_id,
    };

    try {
      const result = await submitBuyerRequest(formData, images);

      if (result.success) {
        // TODO: Add success alert
        Alt.alert(
          "Success",
          "Your buyer request has been submitted successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                // Reset form and close modal
                resetForm();
                setModalVisible(false);
                // Don't refresh posts here to avoid updating data in BuyerPostsContext
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
    setReqiredDate("");
    setBidFrom("");
    setBidTo("");
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
              Add Buyer Request
            </Text>
          </Center>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 120,
            }}
            showsVerticalScrollIndicator={false}
          >
            <KeyboardAvoidingView className="flex bg-[#C0D85F] h-full rounded-t-[40px] px-4">
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

                <Box className="flex flex-col w-full mt-4">
                  <Text className="font-p500 text-left text-2xl text-[#354040] mb-2">
                    Required Date
                  </Text>
                  <Box className="bg-[#FCFFE0] rounded-full p-3 items-center justify-center">
                    <DateTimePicker
                      value={RequiredDate ? new Date(RequiredDate) : new Date()}
                      mode="date"
                      onChange={(event, date) => {
                        if (date) {
                          setReqiredDate(date.toISOString().split("T")[0]);
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Box className="flex flex-row w-full mt-5">
                  <Text className="font-p500 text-left text-2xl text-[#354040]">
                    Bid Limit
                  </Text>
                </Box>
                <Box className="w-full flex flex-row">
                  <Input
                    className="bg-[#FCFFE0] rounded-full mt-2 h-16 w-[48%]"
                    size={"xl"}
                  >
                    <InputField
                      type="text"
                      placeholder="From"
                      value={BidFrom}
                      onChangeText={(text) => setBidFrom(text)}
                      className="font-p400"
                    />
                  </Input>
                  <Input
                    className="bg-[#FCFFE0] rounded-full mt-2 h-16 w-[48%] ml-4"
                    size={"xl"}
                  >
                    <InputField
                      type="text"
                      placeholder="To"
                      value={BidTo}
                      onChangeText={(text) => setBidTo(text)}
                      className="font-p400"
                    />
                  </Input>
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
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                >
                  <InputField
                    type="text"
                    placeholder="Additional notes"
                    value={Addi}
                    onChangeText={(text) => setAddi(text)}
                    className="font-p400"
                  />
                </Input>

                {errorVisible && (
                  <Alert
                    className="rounded-full mt-4"
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
            </KeyboardAvoidingView>
            <Box className="h-24" />
          </ScrollView>
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

export default AddModalBuyer;

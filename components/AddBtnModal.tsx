import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Platform,
} from "react-native";
import { Box } from "./ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Center } from "./ui/center";
import { BlurView } from "expo-blur";
import { InputField, Input } from "./ui/input";
import { Button, ButtonText } from "./ui/button";
import * as ImagePicker from "expo-image-picker";

interface AddModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const AddModal: React.FC<AddModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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
          <ScrollView>
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
                    placeholder="Quantity"
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
                    placeholder="Quality Grade"
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
                    placeholder="Location"
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
                    placeholder="Area"
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
                    placeholder="Required Date"
                    value={RequiredDate}
                    onChangeText={(text) => setReqiredDate(text)}
                    className="font-p400"
                  />
                </Input>

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

                <Button className="bg-[#4E7456] h-14 rounded-full mt-10 mb-16">
                  <ButtonText className="font-p500 text-[#FCFFE0] text-2xl">
                    Add Request
                  </ButtonText>
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

export default AddModal;

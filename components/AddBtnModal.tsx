import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Box } from "./ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Center } from "./ui/center";
import { BlurView } from "expo-blur";
import { InputField, Input } from "./ui/input";
import { Button, ButtonText } from "./ui/button";

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
                    placeholder="Item Name"
                    value={ItemName}
                    onChangeText={(text) => setitemName(text)}
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

                <Input
                  className="bg-[#FCFFE0] rounded-full mt-8 h-16"
                  size={"xl"}
                  flex-1
                >
                  <InputField
                    type="text"
                    placeholder="Additinal notes"
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

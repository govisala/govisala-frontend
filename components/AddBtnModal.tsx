import React from "react";
import { StyleSheet, Text, Modal, TouchableOpacity, Alert } from "react-native";
import { Box } from "./ui/box";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Center } from "./ui/center";
import { BlurView } from "expo-blur";

interface AddModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const AddModal: React.FC<AddModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
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
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

export default AddModal;

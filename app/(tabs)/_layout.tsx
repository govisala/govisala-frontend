import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddModal from "@/components/AddBtnModal";

export default function TabLayout() {
  const [userRole, setUserRole] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      const value = jsonValue ? JSON.parse(jsonValue) : null;
      if (value !== null) {
        setUserRole(value.user_role);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => (
        <Box className="absolute bottom-8 right-0 left-0 flex mx-4 bg-[#C0D85F] h-16 rounded-full justify-center items-center">
          <HStack className="flex items-center w-full justify-evenly">
            <TouchableOpacity
              onPress={() => {
                router.push("/home");
                setCurrentPage("home");
              }}
              className={
                currentPage === "home" ? "bg-[#FCFFE0] rounded-full p-2" : "p-2"
              }
            >
              <Feather name="home" size={30} color={"#4E7456"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/posts");
                setCurrentPage("posts");
              }}
              className={
                currentPage === "posts"
                  ? "bg-[#FCFFE0] rounded-full p-2"
                  : "p-2"
              }
            >
              <Feather name="grid" size={30} color={"#4E7456"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Box className="w-20 h-20 bg-[#4E7456] items-center justify-center rounded-full">
                <Feather name="plus" size={64} color="#FCFFE0" />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/chats");
                setCurrentPage("chats");
              }}
              className={
                currentPage === "chats"
                  ? "bg-[#FCFFE0] rounded-full p-2"
                  : "p-2"
              }
            >
              <Box className="absolute top-1 z-10 right-1 w-4 h-4 bg-red-600 rounded-full" />
              <Feather name="message-circle" size={30} color={"#4E7456"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/profile");
                setCurrentPage("profile");
              }}
              className={
                currentPage === "profile"
                  ? "bg-[#FCFFE0] rounded-full p-2"
                  : "p-2"
              }
            >
              <Feather name="user" size={30} color={"#4E7456"} />
            </TouchableOpacity>
          </HStack>
          <AddModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </Box>
      )}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="posts" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="chats" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

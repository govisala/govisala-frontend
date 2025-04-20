import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, Alert as Alt } from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SocketProvider } from "@/components/context/SocketContext";
import AddModalBuyer from "@/components/AddBtnModalBuyer";
import AddModalSeller from "@/components/AddBtnModalSeller";
import { UserDataContext } from "@/components/context/UserDataContext";

export default function TabLayout() {
  const [userData, setUserData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState("home");
  const [modalVisibleBuyer, setmodalVisibleBuyer] = useState(false);
  const [modalVisibleSeller, setmodalVisibleSeller] = useState(false);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      const value = jsonValue ? JSON.parse(jsonValue) : null;
      setUserData(value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Added empty dependency array to avoid infinite re-renders

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <SocketProvider>
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
                    currentPage === "home"
                      ? "bg-[#FCFFE0] rounded-full p-2"
                      : "p-2"
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
                    if (userData.user_status !== "verified") {
                      Alt.alert(
                        "Can't Post Items",
                        "Your account is not verified yet. Please wait until your account is being verified."
                      );
                      return;
                    } else {
                      if (userData.user_role === "buyer") {
                        setmodalVisibleBuyer(true);
                      } else {
                        setmodalVisibleSeller(true);
                      }
                    }
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
              {modalVisibleBuyer && (
                <AddModalBuyer
                  modalVisible={modalVisibleBuyer}
                  setModalVisible={setmodalVisibleBuyer}
                />
              )}
              {modalVisibleSeller && (
                <AddModalSeller
                  modalVisible={modalVisibleSeller}
                  setModalVisible={setmodalVisibleSeller}
                />
              )}
            </Box>
          )}
        >
          <Tabs.Screen name="home" />
          <Tabs.Screen name="posts" />
          <Tabs.Screen name="chats" />
          <Tabs.Screen name="profile" />
        </Tabs>
      </SocketProvider>
    </UserDataContext.Provider>
  );
}

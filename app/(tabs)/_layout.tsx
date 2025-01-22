import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const [userRole, setUserRole] = useState("");
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
      tabBar={() => (
        <Box className="flex mb-8 mx-4 bg-[#C0D85F] h-16 rounded-full justify-center items-center">
          <HStack className="flex items-center w-full justify-evenly">
            <TouchableOpacity onPress={() => router.push("/home")}>
              <Feather name="home" size={30} color={"#4E7456"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/posts")}>
              <Feather name="grid" size={30} color={"#4E7456"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/add")}>
              <Box className="w-20 h-20 bg-[#4E7456] items-center justify-center rounded-full">
                <Feather name="plus" size={64} color="#FCFFE0" />
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/chats")}>
              <Feather name="message-circle" size={30} color={"#4E7456"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Feather name="user" size={30} color={"#4E7456"} />
            </TouchableOpacity>
          </HStack>
        </Box>
      )}
    >
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="posts" options={{ headerShown: false }} />
      <Tabs.Screen name="add" options={{ headerShown: false }} />
      <Tabs.Screen name="chats" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}

import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionTitleText,
} from "@/components/ui/accordion";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import StarRating from "react-native-star-rating-widget";
import EditProfileModal from "@/components/EditProfileModal";
import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";
import { UserDataContext } from "@/components/context/UserDataContext";
import axios from "axios";

const profile = {
  name: "Keels Matara - Maddawwatte",
  email: "keelsmaddawatta@jk.lk",
  phone: "041-2345678",
  address: "No. 123, Maddawatta, Matara",
  city: "Matara",
  buyerid: "B25-4879824",
  ratings: 4.5,
  reviews: 23,
  orders: 12,
  accountStatus: "verified",
  accountType: "BUYER",
  accountCreated: "2024-11-11",
};

const User = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const logoutHandle = async () => {
    await AsyncStorage.removeItem("userData").then(() => {
      console.log("User Data Removed");
      router.replace("/(auth)");
    });
  };

  const reloadHandle = async () => {
    axios
      .get(process.env.EXPO_PUBLIC_API_URL + "/auth/user/" + userData.user_id)
      .then(async (res) => {
        setUserData(res.data);
        await AsyncStorage.setItem("userData", JSON.stringify(res.data));
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      <Box className="absolute -top-96 self-center rounded-full w-[480px] h-[480px] bg-[#C0D85F]" />
      <Box>
        <Center className="flex items-center w-full px-4">
          <Button
            onPress={logoutHandle}
            size="sm"
            className="bg-[#4E7456] rounded-full w-24 items-center justify-center absolute top-0 right-2"
          >
            <ButtonText className="font-p500 ml-2 text-md text-white">
              Logout
            </ButtonText>
            <MaterialIcons name="logout" size={18} color="white" />
          </Button>
          <Button
            onPress={reloadHandle}
            size="sm"
            className="bg-[#4E7456] rounded-full w-28 items-center justify-center absolute top-0 left-2"
          >
            <ButtonText className="font-p500 ml-2 text-md text-white">
              Reload
            </ButtonText>
            <MaterialIcons name="autorenew" size={18} color="white" />
          </Button>
          <Text className="text-center font-p600 text-3xl mb-4 text-[#354040]">
            Profile
          </Text>
          <Avatar size="2xl" className="items-center justify-center">
            <AvatarFallbackText className="font-p500 mt-4">
              {userData?.user_name}
            </AvatarFallbackText>
            <AvatarImage
              source={{
                uri: process.env.EXPO_PUBLIC_API_URL + "/" + userData.user_img,
              }}
            />
            {userData.user_status === "verified" ? (
              <MaterialIcons
                name="verified"
                size={24}
                color="#354040"
                className="bg-[#FCFFE0] rounded-full p-[2px] absolute bottom-0 right-0"
              />
            ) : (
              <MaterialIcons
                name="warning-amber"
                size={24}
                color="red"
                onPress={() => {
                  Alert.alert("Oops!", "Your account is not verified yet.");
                }}
                className="rounded-full p-[2px] absolute bottom-0 right-0"
              />
            )}
          </Avatar>
          <Text className="font-p400 text-2xl text-[#354040] mt-4 text-center">
            {userData.user_name}
          </Text>
          {/* Here need to fix ratings */}
          <>
            <StarRating
              rating={profile.ratings}
              onChange={(rating) => console.log(rating)}
              color="black"
              starSize={24}
            />
            <Text className="font-p400 text-sm text-[#354040]">
              ({profile.ratings} ratings from {profile.reviews} reviews)
            </Text>
          </>

          <Box className="w-full">
            <Accordion
              size="md"
              variant="filled"
              type="single"
              isCollapsible={true}
              isDisabled={false}
              className="mt-4 border border-outline-200 rounded-2xl"
            >
              <AccordionItem className="rounded-2xl bg-[#FCFFE0]" value="a">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText className="font-p600 text-xl">
                            My Details
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AntDesign name="up" size={16} color="black" />
                          ) : (
                            <AntDesign name="down" size={16} color="black" />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons
                        name="alternate-email"
                        size={18}
                        color="black"
                      />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {userData.user_mail}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons name="phone" size={18} color="black" />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {userData.user_tele}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons
                        name="location-pin"
                        size={18}
                        color="black"
                      />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {userData.user_address + ", " + userData.user_district}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons
                        name="verified-user"
                        size={18}
                        color="black"
                      />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {userData.user_role}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons
                        name="date-range"
                        size={18}
                        color="black"
                      />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        Created on {userData.user_createdAt.split("T")[0]}
                      </Text>
                    </Box>
                    <TouchableOpacity
                      onPress={() => setModalVisible(true)}
                      className="absolute bottom-0 right-0 flex-row items-center bg-[#C0D85F] rounded-lg p-2"
                    >
                      <MaterialIcons name="edit" size={18} color="black" />
                      <Text className="ml-1 font-p500 text-md">
                        Edit Profile
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Box>
        </Center>
      </Box>
      <EditProfileModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        profile={profile}
      />
    </SafeAreaView>
  );
};

export default User;

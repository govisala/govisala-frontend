import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  AccordionTitleText,
  AccordionContentText,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import StarRating from "react-native-star-rating-widget";
import EditProfileModal from "@/components/EditProfileModal";
import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";

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
  const logoutHandle = async () => {
    await AsyncStorage.removeItem("userData").then(() => {
      console.log("User Data Removed");
      router.replace("/(auth)");
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
          <Text className="text-center font-p600 text-3xl mb-4 text-[#354040]">
            Buyer Profile
          </Text>
          <Avatar size="2xl" className="items-center justify-center">
            <AvatarFallbackText className="font-p500 mt-4">
              {profile.name}
            </AvatarFallbackText>
            {/* <AvatarImage
              source={{
                uri: `https://ui-avatars.com/api/?name=${profile.name}&background=random&size=300`,
              }}
            /> */}
            {profile.accountStatus === "verified" && (
              <MaterialIcons
                name="verified"
                size={24}
                color="#354040"
                className="bg-[#FCFFE0] rounded-full p-[2px] absolute bottom-0 right-0"
              />
            )}
          </Avatar>
          <Text className="font-p400 text-2xl text-[#354040] mt-4 text-center">
            {profile.name}
          </Text>
          <StarRating
            rating={profile.ratings}
            onChange={(rating) => console.log(rating)}
            color="black"
            starSize={24}
          />
          <Text className="font-p400 text-sm text-[#354040]">
            ({profile.ratings} ratings from {profile.reviews} reviews)
          </Text>

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
                        {profile.email}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons name="phone" size={18} color="black" />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {profile.phone}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons
                        name="location-pin"
                        size={18}
                        color="black"
                      />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {profile.address}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons name="123" size={18} color="black" />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {profile.buyerid}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons
                        name="verified-user"
                        size={18}
                        color="black"
                      />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        {profile.accountType}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <MaterialIcons
                        name="date-range"
                        size={18}
                        color="black"
                      />
                      <Text className="ml-2 font-p400 text-lg text-[#354040]">
                        Created on {profile.accountCreated}
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

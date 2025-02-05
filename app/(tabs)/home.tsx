import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HStack } from "@/components/ui/hstack";
import { InputField, Input } from "@/components/ui/input";

import img1 from "@/assets/images/onions.jpg";

import Feather from "@expo/vector-icons/Feather";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const items = [
  { name: "Item 1", price: "10000", location: "Hambantota" },
  { name: "Item 2", price: "20000", location: "Colombo" },
  { name: "Item 3", price: "30000", location: "Galle" },
  { name: "Item 4", price: "40000", location: "Matara" },
  { name: "Item 5", price: "50000", location: "Kandy" },

  { name: "Item 6", price: "60000", location: "Jaffna" },
  { name: "Item 7", price: "70000", location: "Anuradhapura" },
];

const Home = () => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      const value = jsonValue ? JSON.parse(jsonValue) : null;
      if (value !== null) {
        // console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-[105%]">
      <Box>
        <Center>
          <HStack className="flex-col">
            <Text className="text-3xl font-p600 text-left text-[#354040] ml-4">
              Welcome A,
            </Text>
            <Box className="h-20 flex flex-row items-center rounded-full mx-4">
              <Input
                variant="rounded"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="flex-[80%] bg-[#C0D85F] rounded-full mr-2"
              >
                <InputField
                  placeholder="Looking for something?"
                  className="font-p400 "
                />
                <Feather
                  name="search"
                  size={24}
                  color="#4E7456"
                  className="mr-2"
                />
              </Input>
              <TouchableOpacity className="bg-[#C0D85F] w-12 h-12 rounded-full items-center justify-center">
                <Feather name="bell" size={30} color="#4E7456" />
              </TouchableOpacity>
            </Box>
            <ScrollView className="flex flex-col ml-4">
              <Box className="flex flex-col ">
                <HStack className="flex flex-row items-center">
                  <Text className="text-md font-p400 text-left text-[#FCFFE0] bg-[#4E7456] p-2 rounded-full mr-4">
                    Most Popular
                  </Text>
                </HStack>
                <FlatList
                  data={items}
                  renderItem={({ item }) => (
                    <ImageBackground
                      source={img1}
                      className="flex flex-col w-64 h-64 mr-2 rounded-full border border-outline-200"
                      imageStyle={{ borderRadius: 12 }}
                    >
                      <Box className="flex-[60%] bg-black opacity-40 rounded-t-xl"></Box>
                      <Box className="flex-[40%] flex-col justify-end bg-[#F5DAD2] rounded-b-xl p-2">
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          {item.name}
                        </Text>
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          Location: {item.location}
                        </Text>
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          LKR {item.price}
                        </Text>
                      </Box>
                    </ImageBackground>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  scrollEnabled={true}
                  className="w-full h-64 mt-2"
                />
              </Box>
              <Box className="flex flex-col mt-4">
                <HStack className="flex flex-row items-center">
                  <Text className="text-md font-p400 text-left text-[#FCFFE0] bg-[#4E7456] p-2 rounded-full mr-4">
                    Trending
                  </Text>
                </HStack>
                <FlatList
                  data={items}
                  renderItem={({ item }) => (
                    <ImageBackground
                      source={img1}
                      className="flex flex-col w-64 h-64 mr-2 rounded-full border border-outline-200"
                      imageStyle={{ borderRadius: 12 }}
                    >
                      <Box className="flex-[60%] bg-black opacity-40 rounded-t-xl"></Box>
                      <Box className="flex-[40%] flex-col justify-end bg-[#F5DAD2] rounded-b-xl p-2">
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          {item.name}
                        </Text>
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          Location: {item.location}
                        </Text>
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          LKR {item.price}
                        </Text>
                      </Box>
                    </ImageBackground>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  scrollEnabled={true}
                  className="w-full h-64 mt-2"
                />
              </Box>
              <Box className="flex flex-col mt-4">
                <HStack className="flex flex-row items-center">
                  <Text className="text-md font-p400 text-left text-[#FCFFE0] bg-[#4E7456] p-2 rounded-full mr-4">
                    Recently Added
                  </Text>
                </HStack>
                <FlatList
                  data={items}
                  renderItem={({ item }) => (
                    <ImageBackground
                      source={img1}
                      className="flex flex-col w-64 h-64 mr-2 rounded-full border border-outline-200"
                      imageStyle={{ borderRadius: 12 }}
                    >
                      <Box className="flex-[60%] bg-black opacity-40 rounded-t-xl"></Box>
                      <Box className="flex-[40%] flex-col justify-end bg-[#F5DAD2] rounded-b-xl p-2">
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          {item.name}
                        </Text>
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          Location: {item.location}
                        </Text>
                        <Text className="text-lg font-p400 text-left text-[#354040]">
                          LKR {item.price}
                        </Text>
                      </Box>
                    </ImageBackground>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  scrollEnabled={true}
                  className="w-full h-64 mt-2"
                />
              </Box>
              <Box className="h-16 mb-16" />
            </ScrollView>
          </HStack>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Home;

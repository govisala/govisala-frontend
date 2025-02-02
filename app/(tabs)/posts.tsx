import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

const posts = [
  {
    name: "Onions",
    quantity: "100kg",
    location: "Hambantota",
    unitPrice: "100",
    totalPrice: "10000",
    quality: "A",
    description: "Required Fresh onions from Hambantota",
    deliveryType: "Pickup",
  },
  {
    name: "Potatoes",
    quantity: "100kg",
    location: "Colombo",
    unitPrice: "200",
    totalPrice: "20000",
    quality: "A",
    description: "Required Fresh potatoes from Colombo",
    deliveryType: "Pickup",
  },
  {
    name: "Carrots",
    quantity: "100kg",
    location: "Galle",
    unitPrice: "300",
    totalPrice: "30000",
    quality: "A",
    description: "Required Fresh carrots from Galle",
    deliveryType: "Pickup",
  },
  {
    name: "Beetroot",
    quantity: "100kg",
    location: "Matara",
    unitPrice: "400",
    totalPrice: "40000",
    quality: "A",
    description: "Required Fresh beetroot from Matara",
    deliveryType: "Pickup",
  },
  {
    name: "Tomatoes",
    quantity: "100kg",
    location: "Kandy",
    unitPrice: "500",
    totalPrice: "50000",
    quality: "A",
    description: "Required Fresh tomatoes from Kandy",
    deliveryType: "Pickup",
  },
  {
    name: "Cabbage",
    quantity: "100kg",
    location: "Jaffna",
    unitPrice: "600",
    totalPrice: "60000",
    quality: "A",
    description: "Required Fresh cabbage from Jaffna",
    deliveryType: "Pickup",
  },
  {
    name: "Pumpkin",
    quantity: "100kg",
    location: "Anuradhapura",
    unitPrice: "700",
    totalPrice: "70000",
    quality: "A",
    description: "Required Fresh pumpkin from Anuradhapura",
    deliveryType: "Pickup",
  },
];

const Posts = () => {
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
    <SafeAreaView className="h-full mx-2">
      <Box>
        <Center className="flex items-center justify-center h-full">
          <Text className="text-center font-p600 text-3xl">My Requests</Text>
          <ScrollView className="flex flex-col mt-2">
            {posts.map((post, index) => (
              <Box
                key={index}
                className="flex flex-col border-2 border-gray-300 rounded-2xl p-2 mb-4"
              >
                <Text className="text-left font-p400 text-xl">{post.name}</Text>
                <Text className="text-left font-p400 text-md">
                  Quantity: {post.quantity}
                </Text>
                <Text className="text-left font-p400 text-md">
                  Location: {post.location}
                </Text>
                <Text className="text-left font-p400 text-md">
                  Unit Price: {post.unitPrice}
                </Text>
                <Text className="text-left font-p400 text-md">
                  Total Price: {post.totalPrice}
                </Text>
                <Text className="text-left font-p400 text-md">
                  Quality: {post.quality}
                </Text>
                <Text className="text-left font-p400 text-md">
                  Description: {post.description}
                </Text>
                <Text className="text-left font-p400 text-md">
                  Delivery Type: {post.deliveryType}
                </Text>
              </Box>
            ))}
          </ScrollView>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Posts;

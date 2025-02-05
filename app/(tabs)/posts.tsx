import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

import posts from "@/assets/bidPosts.json";

const Posts = () => {
  const router = useRouter();
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
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      <Box>
        <Center className="flex items-center justify-center h-full">
          <Text className="text-center font-p600 text-3xl text-[#354040]">
            My Requests
          </Text>
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
                <Text className="text-left font-p400 text-md">
                  Required Date: {post.requiredDate}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push(`/(tabs)/bid-list/${post.reqId}`)}
                  className="absolute right-2 top-20 bg-[#C0D85F] rounded-full"
                >
                  <MaterialIcons
                    name="navigate-next"
                    size={32}
                    color="#FCFFE0"
                  />
                </TouchableOpacity>
              </Box>
            ))}
            <Box className="h-16" />
          </ScrollView>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Posts;

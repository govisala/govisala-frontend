import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, TouchableOpacity } from "react-native";

import posts from "@/assets/bidPosts.json";
import { Center } from "@/components/ui/center";

interface BuyerRequestProps {
  reqId: string;
  name: string;
  quantity: string;
  location: string;
  unitPrice: string;
  totalPrice: string;
  quality: string;
  description: string;
  deliveryType: string;
  requiredDate: string;
  bids: any[];
}

function BidPage() {
  const [bRequest, setBRequest] = useState<BuyerRequestProps | null>(null);
  const router = useRouter();
  const { slug } = useLocalSearchParams();

  useEffect(() => {
    const req = posts.find((post) => post.reqId === slug) || null;
    setBRequest(req);
  }, [slug]);

  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      <Box>
        <Text className="text-center font-p600 text-3xl text-[#354040]">
          Request Details
        </Text>
        <Center className="mt-4">
          <Box className="flex flex-col border-2 border-gray-300 rounded-2xl p-2 mb-4">
            <Text className="text-left font-p400 text-xl">
              {bRequest?.name}
            </Text>
            <Text className="text-left font-p400 text-md">
              Quantity: {bRequest?.quantity}
            </Text>
            <Text className="text-left font-p400 text-md">
              Location: {bRequest?.location}
            </Text>
            <Text className="text-left font-p400 text-md">
              Unit Price: {bRequest?.unitPrice}
            </Text>
            <Text className="text-left font-p400 text-md">
              Total Price: {bRequest?.totalPrice}
            </Text>
            <Text className="text-left font-p400 text-md">
              Quality: {bRequest?.quality}
            </Text>
            <Text className="text-left font-p400 text-md">
              Description: {bRequest?.description}
            </Text>
            <Text className="text-left font-p400 text-md">
              Delivery Type: {bRequest?.deliveryType}
            </Text>
            <Text className="text-left font-p400 text-md">
              Required Date: {bRequest?.requiredDate}
            </Text>
          </Box>
        </Center>
        <Text className="ml-2 font-p600 text-3xl text-[#354040]">
          Active Bids
        </Text>
        <ScrollView>
          {bRequest?.bids.map((bid, index) => (
            <Box
              key={index}
              className="flex flex-col border-2 border-gray-300 rounded-2xl p-2 mb-4 mx-2"
            >
              <Text className="text-left font-p400 text-md">
                Supplier Name: {bid.supplierName}
              </Text>
              <Text className="text-left font-p400 text-md">
                Ratings: {bid.ratings}
              </Text>
              <Text className="text-left font-p400 text-md">
                Bid Unit Price: {bid.unitPrice}
              </Text>
              <Text className="text-left font-p400 text-md">
                Possible Dates: {bid.possibleDates}
              </Text>
              <Text className="text-left font-p400 text-md">
                Delivery Type: {bid.deliveryType}
              </Text>
              <Box className="flex-row justify-around m-2">
                <TouchableOpacity>
                  <Text className="text-center font-p500 text-lg text-[#FCFFE0] p-1 bg-[#C0D85F] rounded-full w-24 justify-center items-center ">
                    Accept
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-center font-p500 text-lg text-[#FCFFE0] p-1 bg-red-500 rounded-full w-24 justify-center items-center">
                    Decline
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          ))}
        </ScrollView>
      </Box>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/posts")}
        className="absolute left-2 top-14 bg-[#C0D85F] rounded-full p-1 items-center justify-center"
      >
        <MaterialIcons name="arrow-back-ios-new" size={22} color="#FCFFE0" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default BidPage;

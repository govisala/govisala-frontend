import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import React, { useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

import { BlurView } from "expo-blur";

import ImageSlider from "@coder-shubh/react-native-image-slider";

import { useState } from "react";
import axios from "axios";
import { useBuyerPosts } from "./context/BuyerPostsContext";
import { useFocusEffect } from "expo-router";

interface BuyerPost {
  id: number;
  item_name: string;
  quantity: string;
  location: string;
  area: string;
  bid_from: number;
  bid_to: number;
  quality_grade: string;
  additional_notes: string;
  deliveryType: string;
  required_date: string;
  images: Array<{ image_path: string }>;
}

const BuyerPosts = () => {
  const [visible, setVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { buyerPosts, loading, refreshPosts } = useBuyerPosts();

  // Initial load
  useEffect(() => {
    refreshPosts();
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refreshPosts();
      return () => {};
    }, [])
  );

  const deleteRequest = (reqId: string) => {
    axios
      .delete(process.env.EXPO_PUBLIC_API_URL + "/buyer/delete-req/" + reqId)
      .then((res) => {
        Alert.alert("Request deleted successfully");
        // After successful deletion, refresh the posts
        refreshPosts();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error deleting request");
      });
  };

  const router = useRouter();
  if (loading) {
    return (
      <View className="flex flex-col items-center justify-center h-[1000px]">
        <ActivityIndicator size="large" color="#4E7456" />
      </View>
    );
  }

  return (
    <ScrollView className="flex flex-col mt-2 w-full">
      {buyerPosts.length == 0 ? (
        <Text className="text-center font-p500 text-2xl">No posts found</Text>
      ) : (
        buyerPosts.map((post, index) => (
          <Box
            key={index}
            className="flex flex-col border-2 border-gray-300 rounded-2xl p-2 mx-2 mb-2"
          >
            {visible && (
              <>
                <ImageViewer
                  images={selectedImages}
                  visible={visible}
                  setVisible={setVisible}
                />
              </>
            )}
            <Text className="text-center font-p500 text-2xl">
              {post.item_name}
            </Text>
            <Text className="text-left font-p400 text-md">
              Quantity: {post.quantity}
            </Text>
            <Text className="text-left font-p400 text-md">
              Your Location: {post.location}, {post.area}
            </Text>
            <Text className="text-left font-p400 text-md">
              Bid Range: Rs.{post.bid_from} - Rs.{post.bid_to}
            </Text>
            <Text className="text-left font-p400 text-md">
              Quality: '{post.quality_grade}' Grade
            </Text>
            <Text className="text-left font-p400 text-md">
              Description: {post.additional_notes}
            </Text>
            <Text className="text-left font-p400 text-md">
              Delivery Type: {post.deliveryType}
            </Text>
            <Text className="text-left font-p400 text-md">
              Required Date: {post.required_date.split("T")[0]}
            </Text>

            {/* 2 buttons to delete request and view images */}
            <View className="flex flex-row justify-between mt-2">
              <TouchableOpacity
                onPress={() => {
                  // View images functionality
                  if (post.images && post.images.length > 0) {
                    setVisible(true);
                    setSelectedImages(
                      post.images.map((image) => image.image_path)
                    );
                  } else {
                    Alert.alert(
                      "No Images",
                      "No images available for this post."
                    );
                  }
                }}
                className="bg-[#4E7456] py-2 px-4 rounded-lg"
              >
                <Text className="text-white font-p500">View Images</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Delete Request",
                    "Are you sure you want to delete this request?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () => {
                          // Add delete functionality here
                          console.log("Delete request for post ID:", post.id);
                          deleteRequest(post.id.toString());
                        },
                        style: "destructive",
                      },
                    ]
                  );
                }}
                className="bg-red-500 py-2 px-4 rounded-lg"
              >
                <Text className="text-white font-p500">Delete Request</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => router.push(`/(tabs)/bid-list/${post.id}`)}
              className="absolute right-2 top-20 bg-[#4E7456] rounded-full"
            >
              <MaterialIcons name="navigate-next" size={32} color="#FCFFE0" />
            </TouchableOpacity>
          </Box>
        ))
      )}
    </ScrollView>
  );
};

export default BuyerPosts;

const ImageViewer = ({
  images,
  visible,
  setVisible,
}: {
  images: string[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
      presentationStyle="overFullScreen"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <BlurView style={StyleSheet.absoluteFill} intensity={10} />
      <SafeAreaView className="flex flex-col items-center justify-center">
        <Box className="flex flex-col items-center justify-center">
          <ImageSlider
            testID="imageSlider_testID"
            images={images.map(
              (image) => process.env.EXPO_PUBLIC_API_URL + "/" + image
            )}
            imageHeight={250}
            dotSize={10}
            dotColor="silver"
            activeDotColor="#4E7456"
            showNavigationButtons={false}
            showIndicatorDots={true}
            imageLabel={false}
            extrapolate="clamp"
            autoSlideInterval={5000}
            radius={16}
          />
        </Box>
        {/* close button */}
        <TouchableOpacity
          onPress={() => setVisible(false)}
          className="absolute top-32 right-8 bg-[#4E7456] rounded-full p-2"
        >
          <MaterialIcons name="close" size={32} color="#FCFFE0" />
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

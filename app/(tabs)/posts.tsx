import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BuyerPosts from "@/components/BuyerPosts";
import { UserDataContext } from "@/components/context/UserDataContext";
import { useContext } from "react";
import SellerPosts from "@/components/SellerPosts";
import { BuyerPostsProvider } from "@/components/context/BuyerPostsContext";
import { SellerPostsProvider } from "@/components/context/SellerPostsContext";

const PostsScreen = () => {
  const { userData } = useContext(UserDataContext);
  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      <Box>
        <Center className="flex items-center justify-center h-full">
          <Text className="text-center font-p600 text-3xl text-[#354040]">
            {userData.user_role == "buyer" ? "My Requests" : "My Posts"}
          </Text>
          {userData.user_role == "buyer" ? (
            <BuyerPostsProvider>
              <BuyerPosts />
            </BuyerPostsProvider>
          ) : (
            <SellerPostsProvider>
              <SellerPosts />
            </SellerPostsProvider>
          )}
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default PostsScreen;

import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";

const User = () => {
  return (
    <SafeAreaView>
      <Box>
        <Center className="flex items-center w-full px-2">
          <Text className="text-center font-p600 text-3xl mb-4 text-[#354040]">
            My Profile
          </Text>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default User;

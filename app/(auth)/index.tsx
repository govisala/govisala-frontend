import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect } from "react";

import LottieView from "lottie-react-native";

import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// import ani1 from "@/assets/animation/ani1.json";

function RootPage() {
  return (
    <SafeAreaView className="bg-[#FCFFE0] h-full">
      <Box className="px-4 pt-8">
        <VStack>
          <Text className="font-p500 text-3xl mb-2">Welcome to</Text>
          <Text className="font-p600 text-5xl py-2 -mb-10">GoviSala!</Text>
          <Box className="flex w-full h-[300px] justify-center items-center ml-2 mb-36">
            <LottieView
              source={require("../../assets/animation/ani1.json")}
              autoPlay
              loop
              style={{ flex: 1, width: 300, height: 300 }}
            />
          </Box>
          <Text className="font-p500 text-3xl mb-4">To Get Started,</Text>
        </VStack>
        <Link href="/login" asChild>
          <Button className="bg-[#75A47F] h-14 rounded-full">
            <ButtonText className="font-p500 text-[#FCFFE0] text-2xl">
              Login
            </ButtonText>
          </Button>
        </Link>
        <Box className="flex flex-row items-center justify-center">
          <Box className="h-[2px] bg-[#354040] w-32 mr-1" />
          <Text className="text-center my-4 font-p400 text-sm text-[#354040]">
            OR
          </Text>
          <Box className="h-[2px] bg-[#354040] w-32 ml-1" />
        </Box>
        <Link href="/register" asChild>
          <Button className="bg-[#FCFFE0] h-14 rounded-full">
            <ButtonText className="font-p500 text-[#354040] text-2xl">
              Register
            </ButtonText>
          </Button>
        </Link>
      </Box>
      <Box className="w-[800px] h-[800px] bg-[#C0D85F] absolute -z-50 rotate-[75deg] top-[440px]" />
    </SafeAreaView>
  );
}

export default RootPage;

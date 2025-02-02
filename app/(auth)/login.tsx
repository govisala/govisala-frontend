import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Pressable } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

const User = z.object({
  user_mail: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  user_pwd: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

function Login() {
  const [email, setEmail] = useState("");
  const [passWd, setpassWd] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    try {
      let user = User.parse({ user_mail: email, user_pwd: passWd });
      axios
        .post("http://localhost:3210/auth/login", user)
        .then(async (res) => {
          if (res.status == 200) {
            try {
              const jsonValue = JSON.stringify(res.data.userData);
              await AsyncStorage.setItem("userData", jsonValue);
            } catch (e: any) {
              console.log(e);
            }
            router.push("/(tabs)/home");
          }
        })
        .catch((err: any) => {
          console.log(err.message);
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-[#FCFFE0]">
      <Pressable onPress={() => router.back()} className="p-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Box className="flex w-full h-[180px] justify-center">
        <LottieView
          source={require("../../assets/animation/ani1.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </Box>
      <Box className="bg-[#C0D85F] h-full rounded-t-[40px] px-4">
        <VStack>
          <Center>
            <Text className="text-4xl font-p600 mt-8 p-1">Sign In</Text>
            <Input
              className="bg-[#FCFFE0] rounded-full mt-12 h-16 text-[#75A47F]"
              size={"xl"}
            >
              <InputField
                type="text"
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="font-p400 text-[#354040]"
              />
            </Input>
            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="password"
                placeholder="Password"
                value={passWd}
                onChangeText={(text) => setpassWd(text)}
                className="font-p400"
              />
            </Input>

            <Button
              className="bg-[#4E7456] rounded-full mt-8 w-full h-16"
              size={"xl"}
              onPress={handleSubmit}
            >
              <ButtonText className="color-[#FCFFE0] font-p600 text-2xl">
                Sign In
              </ButtonText>
            </Button>
            <Pressable onPress={() => router.push("/(tabs)/home")}>
              <Text className="text-right mt-4 font-p500 text-[#4E7456]">
                {" "}
                Forgot password?
              </Text>
            </Pressable>
            <Box className="flex flex-row items-center justify-center">
              <Box className="h-[2px] bg-[#354040] w-32 mr-1" />
              <Text className="text-center my-4 font-p400 text-sm text-[#354040]">
                OR
              </Text>
              <Box className="h-[2px] bg-[#354040] w-32 ml-1" />
            </Box>
            <Pressable onPress={() => router.push("/register")}>
              <Text className="font-p500">Sign Up</Text>
            </Pressable>
          </Center>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}

export default Login;

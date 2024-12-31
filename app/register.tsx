import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";

function Login() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [ConfirmPwd, setConfirmPwd] = useState("");
  const [passWd, setpassWd] = useState("");

  const handleSubmit = () => {
    if (passWd.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };
  return (
    <SafeAreaView className="bg-[#FCFFE0]">
      <Box className="flex w-full h-[180px] justify-center">
        <LottieView
          source={require("../assets/animation/ani1.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </Box>
      <Box className="bg-[#C0D85F] h-full rounded-t-[40px] px-4">
        <VStack>
          <Center>
            <Text className="text-4xl font-p600 mt-8 p-1">Sign Up</Text>
            <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Email address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="font-p400"
              />
            </Input>
            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Name"
                value={Name}
                onChangeText={(text) => setName(text)}
                className="font-p400"
              />
            </Input>

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Contact number"
                value={ContactNumber}
                onChangeText={(text) => setContactNumber(text)}
                className="font-p400"
              />
            </Input>

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Address"
                value={Address}
                onChangeText={(text) => setAddress(text)}
                className="font-p400"
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

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={ConfirmPwd}
                onChangeText={(text) => setConfirmPwd(text)}
                className="font-p400"
              />
            </Input>

            <Button
              className="bg-[#4E7456] rounded-full mt-8 w-full h-16"
              size={"xl"}
            >
              <ButtonText className="color-[#FCFFE0] font-p600 text-2xl">
                Sign Up
              </ButtonText>
            </Button>
            <Box className="flex flex-row items-center justify-center">
              <Box className="h-[2px] bg-[#354040] w-32 mr-1" />
              <Text className="text-center my-4 font-p400 text-sm text-[#354040]">
                OR
              </Text>
              <Box className="h-[2px] bg-[#354040] w-32 ml-1" />
            </Box>
            <Text></Text>
          </Center>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}

export default Login;

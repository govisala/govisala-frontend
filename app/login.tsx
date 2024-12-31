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
      <Box className="bg-[#C0D85F] h-full rounded-t-[40px] p-2">
        <VStack>
          <Center>
            <Text className="text-4xl font-p600 mt-4">Sign In</Text>
            <Input className="bg-[#FCFFE0] rounded-full mt-8" size={"xl"}>
              <InputField
                type="text"
                placeholder="Email"
                value={passWd}
                onChangeText={(text) => setpassWd(text)}
                className="font-p400"
              />
            </Input>
            <Input className="bg-[#FCFFE0] rounded-full mt-4" size={"xl"}>
              <InputField
                type="password"
                placeholder="Password"
                value={passWd}
                onChangeText={(text) => setpassWd(text)}
                className="font-p400"
              />
            </Input>
            <Text className="text-left mt-4"> Remember me?</Text>
            <Button className="bg-[#4E7456] rounded-full mt-8" size={"xl"}>
              <ButtonText className="color-[#FCFFE0]">Sign In</ButtonText>
            </Button>
            <Text className="text-right mt-4"> Forgot password?</Text>

            <Text></Text>
          </Center>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}

export default Login;

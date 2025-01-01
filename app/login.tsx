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

interface User {
  user_mail: string;
  user_pwd: string;
}

function Login() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [passWd, setpassWd] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const user: User = {
      user_mail: email,
      user_pwd: passWd,
    };
    console.log(user);

    axios
      .post("http://localhost:3210/auth/login", user)
      .then((res) => {
        if (res.status == 200) {
          router.push("/(tabs)/home");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.data.message);
      });
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
            <Text className="text-right mt-4 font-p500 text-[#4E7456]">
              {" "}
              Forgot password?
            </Text>
            <Text></Text>
          </Center>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}

export default Login;

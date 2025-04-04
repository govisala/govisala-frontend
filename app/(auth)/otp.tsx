import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";

import { Alert, AlertText } from "@/components/ui/alert";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Center } from "@/components/ui/center";
import { Input, InputField } from "@/components/ui/input";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { any } from "zod";

// import ani1 from "@/assets/animation/ani1.json";

function OTP() {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleClose = () => {
    setShowAlertDialog(false);
    router.push("/(auth)/login");
  };

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    //get the user id from AsyncStorage
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        setUserId(userId);
      } catch (error) {
        console.error("Error retrieving user ID:", error);
      }
    };
    getUserId();
  }, []);
  const HOST = "10.48.36.23";
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = () => {
    // Handle OTP submission logic here
    console.log(userId);

    axios
      .post("http://" + HOST + ":3210/auth/otp-verify", {
        otp: otpCode,
        user_id: userId,
      })
      .then((response) => {
        console.log("OTP verification response:", response.data);
        setShowAlertDialog(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };
  return (
    <SafeAreaView className="bg-[#FCFFE0] h-full">
      <Box className="px-4 pt-8">
        <VStack className="mt-12 justify-center">
          {showAlertDialog && (
            <AlertDialog
              isOpen={showAlertDialog}
              onClose={handleClose}
              size="md"
            >
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Text
                    className="text-typography-950 font-semibold font-p400"
                    size="xl"
                  >
                    OTP Verified Successfully
                  </Text>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                  <Text size="md" className="font-p400">
                    Your OTP has been verified successfully. You can now log in
                    to your account.
                  </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Center>
                    <Button size="lg" onPress={handleClose}>
                      <ButtonText className="font-p500">Go to login</ButtonText>
                    </Button>
                  </Center>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Text className="font-p500 text-3xl mb-2">
            OTP code has been sent to your mail,
          </Text>
          <Text className="font-p500 text-xl mb-24">
            Please check your email and enter the code below,
          </Text>
          <Center>
            {/* Here OTP code text input gluestak components */}
            <Text className="font-p500 text-3xl mb-2">
              Enter your code Here,
            </Text>
            <Input
              variant="rounded"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={otpCode}
                onChangeText={setOtpCode}
                className="font-p400"
                placeholder="OTP code"
              />
            </Input>
            <Button
              className="mt-8 rounded-full"
              size="xl"
              variant="solid"
              action="primary"
              onPress={handleSubmit}
            >
              <ButtonText className="font-p500 text-2xl">Submit</ButtonText>
            </Button>
            {showAlert && (
              <Alert
                className="rounded-full mt-16"
                action="error"
                variant="solid"
              >
                {/* <AlertIcon as={InfoIcon} /> */}
                <Ionicons
                  name="information-circle-outline"
                  size={28}
                  color="#a53333"
                />
                <AlertText className="font-p400" size="xl">
                  {error}
                </AlertText>
              </Alert>
            )}
          </Center>
        </VStack>
      </Box>
      <Box className="w-[800px] h-[800px] bg-[#C0D85F] absolute -z-50 rotate-[75deg] top-[440px]" />
    </SafeAreaView>
  );
}

export default OTP;

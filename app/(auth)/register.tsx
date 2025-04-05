import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectBackdrop,
  SelectPortal,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import axios from "axios";

import {
  Pressable,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";

function Register() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [userRole, setUserRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const deleteProfileImage = () => {
    setProfileImage("");
  };

  const pickIdDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setIdDocument(result.assets[0].uri);
    }
  };

  const deleteIdDocument = () => {
    setIdDocument("");
  };

  const validateForm = () => {
    // Basic validation
    if (
      !email ||
      !name ||
      !contactNumber ||
      !address ||
      !district ||
      !userRole ||
      !password ||
      !confirmPassword
    ) {
      return "All fields are required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Password validation
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    // Password confirmation
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    // ID Document validation
    if (!idDocument) {
      return "National ID or Business Registration document is required";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      setPasswordError(error);
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);
    setPasswordError("");
    setIsLoading(true);
    setFormError("");

    try {
      // Create form data for multipart/form-data submission
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("contactNumber", contactNumber);
      formData.append("address", address);
      formData.append("district", district);
      formData.append("userRole", userRole);
      formData.append("password", password);

      // Append profile image if available
      if (profileImage) {
        // Get file extension from URI
        const uriParts = profileImage.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("profileImage", {
          uri: profileImage,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      // Append ID document (required)
      const idDocParts = idDocument.split(".");
      const idDocType = idDocParts[idDocParts.length - 1];

      formData.append("idDocument", {
        uri: idDocument,
        name: `id-document.${idDocType}`,
        type: `image/${idDocType}`,
      });

      console.log("Submitting form data:", formData);

      // Submit to server using axios
      const response = await axios.post(
        process.env.EXPO_PUBLIC_API_URL + "/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          transformRequest: (data, headers) => {
            // Don't transform the data
            return data;
          },
        }
      );

      console.log("Registration successful:", response.data);
      // Save user id on AsyncStorage
      await AsyncStorage.setItem("userId", response.data.user_id);
      // Navigate to login page or confirmation page
      router.push("/(auth)/otp");
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setFormError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-[#FCFFE0]">
      <Pressable onPress={() => router.back()} className="p-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Box className="w-full justify-center items-center">
        <LottieView
          source={require("../../assets/animation/ani1.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </Box>
      <Box className="bg-[#C0D85F] flex-1 rounded-t-[40px]">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Center>
            <Text className="text-4xl font-p600 mt-6 p-1">Sign Up</Text>

            {/* User Profile Image Selector */}
            <View className="mt-4 items-center">
              <View className="relative">
                <TouchableOpacity onPress={pickProfileImage}>
                  <View className="w-32 h-32 rounded-full bg-[#FCFFE0] overflow-hidden border-2 border-[#4E7456] justify-center items-center">
                    {profileImage ? (
                      <Image
                        source={{ uri: profileImage }}
                        className="w-full h-full"
                      />
                    ) : (
                      <Ionicons name="person-add" size={40} color="#4E7456" />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Delete Button - Only visible when an image is selected */}
                {profileImage && (
                  <TouchableOpacity
                    onPress={deleteProfileImage}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-8 h-8 justify-center items-center"
                  >
                    <Ionicons name="close" size={18} color="white" />
                  </TouchableOpacity>
                )}
              </View>

              <Text className="text-center mt-2 font-p400 text-sm">
                Choose Profile Picture
              </Text>
            </View>

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Full Name or Business Name"
                value={name}
                onChangeText={(text) => setName(text)}
                className="font-p400"
              />
            </Input>

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Phone Number"
                value={contactNumber}
                keyboardType="phone-pad"
                onChangeText={(text) => setContactNumber(text)}
                className="font-p400"
              />
            </Input>

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Email Address"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                className="font-p400"
              />
            </Input>

            {/* User Role Dropdown */}
            <Select onValueChange={(value) => setUserRole(value)}>
              <SelectTrigger
                variant="rounded"
                size="lg"
                className="mt-4 bg-[#FCFFE0] rounded-full w-full text-[#365e3e] h-16 justify-between pr-2"
              >
                <SelectInput
                  placeholder="Select role"
                  className="bg-[#FCFFE0] rounded-full text-xl text-[#365e3e] font-p400"
                />
                <Ionicons name="chevron-down" size={24} color="#4E7456" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent className="pb-12 font-p400">
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem
                    className="font-p400"
                    label="Buyer"
                    value="buyer"
                  />
                  <SelectItem
                    className="font-p400"
                    label="Seller"
                    value="seller"
                  />
                </SelectContent>
              </SelectPortal>
            </Select>

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
                className="font-p400"
              />
            </Input>

            <Input className="bg-[#FCFFE0] rounded-full mt-4 h-16" size={"xl"}>
              <InputField
                type="text"
                placeholder="District"
                value={district}
                onChangeText={(text) => setDistrict(text)}
                className="font-p400"
              />
            </Input>

            <Input
              className={`bg-[#FCFFE0] rounded-full mt-4 h-16 ${
                isInvalid && password.length < 6 ? "border-red-500" : ""
              }`}
              size={"xl"}
            >
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                className="font-p400"
              />
            </Input>

            <Input
              className={`bg-[#FCFFE0] rounded-full mt-4 h-16 ${
                isInvalid && password !== confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
              size={"xl"}
            >
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                className="font-p400"
              />
            </Input>
            {/* ID Document Selector */}
            <View className="mt-6 items-center w-full">
              <Text className="text-left w-full font-p500 text-base mb-2 text-[#4E7456]">
                National ID or Business Registration *
              </Text>
              <View className="relative w-full h-40 rounded-lg bg-[#FCFFE0] overflow-hidden border-2 border-[#4E7456] justify-center items-center">
                <TouchableOpacity
                  onPress={pickIdDocument}
                  className="w-full h-full justify-center items-center"
                >
                  {idDocument ? (
                    <Image
                      source={{ uri: idDocument }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  ) : (
                    <View className="items-center">
                      <Ionicons
                        name="document-attach"
                        size={40}
                        color="#4E7456"
                      />
                      <Text className="text-center mt-2 font-p400 text-sm text-[#4E7456]">
                        Tap to upload document
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Delete Button - Only visible when a document is selected */}
                {idDocument && (
                  <TouchableOpacity
                    onPress={deleteIdDocument}
                    className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 justify-center items-center"
                  >
                    <Ionicons name="close" size={18} color="white" />
                  </TouchableOpacity>
                )}
              </View>
              <Text className="text-center mt-1 font-p400 text-xs text-[#4E7456]">
                Required for verification purposes
              </Text>
            </View>

            {passwordError ? (
              <Text className="text-red-500 text-sm mt-2 font-p400">
                {passwordError}
              </Text>
            ) : null}

            {formError ? (
              <Text className="text-red-500 text-sm mt-2 font-p400">
                {formError}
              </Text>
            ) : null}

            <Button
              className="bg-[#4E7456] rounded-full mt-6 w-full h-16"
              size={"xl"}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FCFFE0" />
              ) : (
                <ButtonText className="color-[#FCFFE0] font-p600 text-2xl">
                  Sign Up
                </ButtonText>
              )}
            </Button>

            <Box className="flex flex-row items-center justify-center mt-4">
              <Box className="h-[2px] bg-[#354040] w-32 mr-1" />
              <Text className="text-center my-2 font-p400 text-sm text-[#354040]">
                OR
              </Text>
              <Box className="h-[2px] bg-[#354040] w-32 ml-1" />
            </Box>

            <Pressable onPress={() => router.push("/login")} className="mb-8">
              <Text className="font-p500">
                Already have an account? Sign In
              </Text>
            </Pressable>
          </Center>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}

export default Register;

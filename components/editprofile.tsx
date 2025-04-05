import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  Button,
  Input,
  VStack,
  HStack,
  Select,
  FormControl,
  Text,
  TextArea,
  Icon,
  Spinner,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";

const EditProfileScreen = ({ navigation, route }) => {
  // User data passed from previous screen or fetched from API
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    user_id: "USR12345",
    user_name: "John Doe",
    user_mail: "john.doe@example.com",
    user_pwd: "********", // Password field typically hidden/masked
    user_role: "user", // Assuming 'user' or 'admin' as ENUM values
    user_address: "123 Main Street",
    user_district: "Downtown",
    user_tele: "+1 (555) 123-4567",
    user_img: "https://via.placeholder.com/150",
    user_status: "active", // Assuming 'active' or 'inactive' as ENUM values
    user_docs: "ID_Card_12345",
    user_otp_verified: 1, // 1 for verified, 0 for not verified
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });

    // Clear error for this field if any
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
      includeBase64: true,
    });

    if (!result.didCancel && result.assets && result.assets[0]) {
      setUserData({
        ...userData,
        user_img: result.assets[0].uri,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.user_name.trim()) {
      newErrors.user_name = "Name is required";
    }

    if (!userData.user_mail.trim()) {
      newErrors.user_mail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.user_mail)) {
      newErrors.user_mail = "Email is invalid";
    }

    if (!userData.user_tele.trim()) {
      newErrors.user_tele = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Success
        alert("Profile updated successfully!");
        // navigation.goBack();
      } catch (error) {
        alert("Failed to update profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 pb-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Icon as={MaterialIcons} name="arrow-back" size="lg" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Edit Profile</Text>
          <View className="w-8" /> {/* Spacer for alignment */}
        </View>

        {/* Profile Picture Section */}
        <View className="items-center mb-6">
          <View className="relative">
            <Image
              source={{ uri: userData.user_img }}
              className="w-24 h-24 rounded-full bg-gray-200"
            />
            <TouchableOpacity
              onPress={selectImage}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 items-center justify-center"
            >
              <Icon
                as={MaterialIcons}
                name="camera-alt"
                size="sm"
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Text className="mt-2 text-sm text-gray-500">
            Tap to change profile picture
          </Text>
        </View>

        <VStack space="md">
          {/* Basic Info Section */}
          <FormControl isInvalid={!!errors.user_name}>
            <FormControl.Label>Full Name</FormControl.Label>
            <Input
              value={userData.user_name}
              onChangeText={(value) => handleInputChange("user_name", value)}
              placeholder="Enter your full name"
              className="bg-white"
            />
            {errors.user_name && (
              <FormControl.Error>{errors.user_name}</FormControl.Error>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.user_mail}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={userData.user_mail}
              onChangeText={(value) => handleInputChange("user_mail", value)}
              placeholder="Enter your email"
              className="bg-white"
              keyboardType="email-address"
            />
            {errors.user_mail && (
              <FormControl.Error>{errors.user_mail}</FormControl.Error>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.user_tele}>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input
              value={userData.user_tele}
              onChangeText={(value) => handleInputChange("user_tele", value)}
              placeholder="Enter your phone number"
              className="bg-white"
              keyboardType="phone-pad"
            />
            {errors.user_tele && (
              <FormControl.Error>{errors.user_tele}</FormControl.Error>
            )}
          </FormControl>

          {/* Address Section */}
          <FormControl>
            <FormControl.Label>Address</FormControl.Label>
            <TextArea
              value={userData.user_address}
              onChangeText={(value) => handleInputChange("user_address", value)}
              placeholder="Enter your address"
              className="bg-white"
              h={20}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>District</FormControl.Label>
            <Input
              value={userData.user_district}
              onChangeText={(value) =>
                handleInputChange("user_district", value)
              }
              placeholder="Enter your district"
              className="bg-white"
            />
          </FormControl>

          {/* Role Selection (if applicable for admin) */}
          <FormControl>
            <FormControl.Label>Role</FormControl.Label>
            <Select
              selectedValue={userData.user_role}
              onValueChange={(value) => handleInputChange("user_role", value)}
              className="bg-white"
            >
              <Select.Item label="User" value="user" />
              <Select.Item label="Admin" value="admin" />
            </Select>
          </FormControl>

          {/* Status Selection */}
          <FormControl>
            <FormControl.Label>Status</FormControl.Label>
            <Select
              selectedValue={userData.user_status}
              onValueChange={(value) => handleInputChange("user_status", value)}
              className="bg-white"
            >
              <Select.Item label="Active" value="active" />
              <Select.Item label="Inactive" value="inactive" />
            </Select>
          </FormControl>

          {/* Document Upload Section */}
          <FormControl>
            <FormControl.Label>Documents</FormControl.Label>
            <HStack className="bg-white p-3 rounded-md items-center justify-between">
              <Text numberOfLines={1} className="flex-1">
                {userData.user_docs || "No document uploaded"}
              </Text>
              <TouchableOpacity className="bg-gray-200 p-2 rounded-md">
                <Text className="text-blue-600">Upload</Text>
              </TouchableOpacity>
            </HStack>
          </FormControl>

          {/* Change Password Option */}
          <TouchableOpacity className="mt-2">
            <Text className="text-blue-600 font-semibold">Change Password</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <Button
            onPress={handleSubmit}
            className="mt-4 bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <HStack space="sm" alignItems="center">
                <Spinner size="small" color="white" />
                <Text className="text-white font-medium">Updating...</Text>
              </HStack>
            ) : (
              <Text className="text-white font-medium">Save Changes</Text>
            )}
          </Button>
        </VStack>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

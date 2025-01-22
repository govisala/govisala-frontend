import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Posts = () => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      const value = jsonValue ? JSON.parse(jsonValue) : null;
      if (value !== null) {
        // console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <SafeAreaView>
      <Box>
        <Center className="flex items-center justify-center">
          <Text>Posts</Text>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Posts;

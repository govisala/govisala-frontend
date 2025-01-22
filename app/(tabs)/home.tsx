import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HStack } from "@/components/ui/hstack";
import { InputField, Input } from "@/components/ui/input";

import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

const Home = () => {
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
          <HStack className="flex items-center justify-center">
            <Box className="h-20 flex flex-row items-center justify-between rounded-full mx-4">
              <Input
                variant="rounded"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="flex-[80%] mx-4 bg-[#C0D85F] rounded-full"
              >
                <InputField
                  placeholder="Type to search..."
                  className="font-p400 "
                />
                <Feather
                  name="search"
                  size={24}
                  color="#4E7456"
                  className="mr-2"
                />
              </Input>
              <TouchableOpacity className="bg-[#C0D85F] w-12 h-12 rounded-full items-center justify-center">
                <Feather name="bell" size={30} color="#4E7456" />
              </TouchableOpacity>
            </Box>
          </HStack>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Home;

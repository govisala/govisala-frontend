import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <Box>
        <Center className="flex items-center justify-center">
          <Text>Home</Text>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Home;

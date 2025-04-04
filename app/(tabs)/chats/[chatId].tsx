import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import messages from "@/assets/messages.json";
import { any } from "zod";

function ChatPages() {
  const { chatId } = useLocalSearchParams();
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    if (!chatId) {
      router.push("/(tabs)/chats");
    }
    const chat = messages.find((message: any) => message.id === chatId);
    setChat(chat);
    console.log(chat);
  }, [chatId]);

  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      <Box>
        <Center className="flex items-center w-full px-2">
          <Text className="text-center font-p600 text-3xl mb-4 text-[#354040]">
            {chat?.name}
          </Text>
        </Center>
      </Box>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/chats")}
        className="absolute left-2 top-14 bg-[#C0D85F] rounded-full p-1 items-center justify-center"
      >
        <MaterialIcons name="arrow-back-ios-new" size={22} color="#FCFFE0" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ChatPages;

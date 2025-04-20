import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import messages from "@/assets/messages.json";

// Define message types for TypeScript
interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface ChatData {
  id: string;
  name: string;
  messages: Message[];
  avatar?: string;
}

function ChatPages() {
  const { chatId } = useLocalSearchParams();
  const [chat, setChat] = useState<ChatData | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!chatId) {
      router.push("/(tabs)/chats");
    }
    // Cast messages to any to handle the find operation
    const foundChat = messages.find((message: any) => message.id === chatId);
    setChat(foundChat);
  }, [chatId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !chat) return;

    const updatedChat = {
      ...chat,
      messages: [
        ...chat.messages,
        {
          id: Date.now().toString(),
          text: newMessage,
          sender: "user",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setChat(updatedChat);
    setNewMessage("");

    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Format timestamp for display
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      {/* Header */}
      <Box className="pt-4 pb-2 border-b border-[#C0D85F]">
        <Center className="flex items-center w-full px-2">
          <Text className="text-center font-p600 text-3xl mb-2 text-[#354040]">
            {chat?.name}
          </Text>
        </Center>
      </Box>

      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/chats")}
        className="absolute left-4 top-10 bg-[#C0D85F] rounded-full p-1 items-center justify-center"
      >
        <MaterialIcons name="arrow-back-ios-new" size={22} color="#FCFFE0" />
      </TouchableOpacity>

      {/* Chat messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {chat?.messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 max-w-3/4 ${
                message.sender === "user"
                  ? "self-end ml-auto"
                  : "self-start mr-auto"
              }`}
            >
              <Box
                className={`rounded-2xl p-3 ${
                  message.sender === "user"
                    ? "bg-[#C0D85F] rounded-br-none"
                    : "bg-[#E3E9BB] rounded-bl-none"
                }`}
              >
                <Text className="text-[#354040] text-base">{message.text}</Text>
                <Text
                  className={`text-[#354040] text-xs mt-1 opacity-60 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </Box>
            </View>
          ))}
        </ScrollView>

        {/* Message input */}
        <Box className="p-4 border-t border-[#C0D85F] bg-[#FCFFE0] flex-row items-center">
          <Input
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            className="flex-1 bg-[#E3E9BB] rounded-full px-4 py-2 mr-2"
            placeholderTextColor="#354040"
          />
          <TouchableOpacity
            onPress={sendMessage}
            className="bg-[#C0D85F] rounded-full p-3 items-center justify-center"
            disabled={!newMessage.trim()}
          >
            <MaterialIcons name="send" size={20} color="#FCFFE0" />
          </TouchableOpacity>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ChatPages;

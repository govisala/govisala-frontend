import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";

const messages = [
  {
    id: 1,
    name: "John Doe",
    message: "Hello, Can you know about this order?",
    time: "10:00 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Peter Parker",
    message: "Is it okay to door step delivery?",
    time: "11:00 AM",
    unread: 1,
  },
  {
    id: 3,
    name: "Tony Stark",
    message: "I have some queries about the product",
    time: "12:00 PM",
    unread: 0,
  },
  {
    id: 4,
    name: "Bruce Wayne",
    message: "Can you help me with this issue?",
    time: "1:00 PM",
    unread: 0,
  },
];

const chats = () => {
  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      <Box>
        <Center className="flex items-center w-full px-2">
          <Text className="text-center font-p600 text-3xl mb-4 text-[#354040]">
            Chats
          </Text>
          <ScrollView>
            {messages.map((message) => (
              <TouchableOpacity key={message.id}>
                <Box
                  key={message.id}
                  className="flex flex-row items-center justify-between border-b border-gray-200 mb-2 pb-2"
                >
                  <Box className="flex flex-row items-center">
                    <Box className="mr-4">
                      <Image
                        source={{
                          uri: `https://ui-avatars.com/api/?name=${message.name}&background=random&size=50`,
                        }}
                        style={{ width: 52, height: 52, borderRadius: 50 }}
                      />
                    </Box>
                    <Box>
                      <Text className="font-p600">{message.name}</Text>
                      <Text
                        className={
                          message.unread > 0
                            ? "text-gray-900 font-p500"
                            : "text-gray-500 font-p400"
                        }
                      >
                        {message.message}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="flex flex-col items-end">
                    <Text className="text-gray-400">{message.time}</Text>
                    {message.unread > 0 && (
                      <Box className="bg-primary w-6 h-6 rounded-full flex bg-red-600 items-center justify-center">
                        <Text className="text-white ">{message.unread}</Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default chats;

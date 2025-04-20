import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { router } from "expo-router";
import { useSocket } from "@/components/context/SocketContext";
import axios from "axios";
import { UserDataContext } from "@/components/context/UserDataContext";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketContext = useSocket();
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    fetchChats();

    // Check if socket is available before using it
    if (socketContext && socketContext.socket) {
      // Set up socket event listeners
      socketContext.socket.on("new_message", (data) => {
        setChats((prevChats) => {
          return prevChats.map((chat) => {
            if (chat.chatId === data.chatId) {
              return {
                ...chat,
                lastMessage: data.message,
                unreadCount: chat.unreadCount + 1,
                lastMessageTime: new Date().toISOString(),
              };
            }
            return chat;
          });
        });
      });

      // Clean up listeners on unmount
      return () => {
        socketContext.socket.off("new_message");
      };
    }
  }, [socketContext.socket]); // Depend on socket to re-run when it's available

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/chats/${userData.user_id}`
      );
      setChats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chats:", error);
      setLoading(false);
    }
  };

  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
        <Center className="flex-1">
          <ActivityIndicator size="large" color="#354040" />
        </Center>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-[#FCFFE0] w-full h-full">
      <Box>
        <Center className="flex items-center w-full px-2">
          <Text className="text-center font-p600 text-3xl mb-4 text-[#354040]">
            Chats
          </Text>
          <ScrollView className="w-full">
            {chats.length === 0 ? (
              <Box className="py-10">
                <Text className="text-center text-gray-500">No chats yet</Text>
              </Box>
            ) : (
              chats.map((chat) => (
                <TouchableOpacity
                  key={chat.chatId}
                  onPress={() =>
                    router.push({
                      pathname: `/(tabs)/chats/${chat.chatId}`,
                      params: {
                        listingId: chat.listingId,
                        listingType: chat.listingType,
                        recipientId: chat.recipientId,
                        recipientName: chat.recipientName,
                      },
                    })
                  }
                >
                  <Box className="flex flex-row items-center justify-between border-b border-gray-200 mb-2 pb-2 px-3">
                    <Box className="flex flex-row items-center flex-1">
                      <Box className="mr-4">
                        <Image
                          source={{
                            uri: `https://ui-avatars.com/api/?name=${chat.recipientName}&background=random&size=50`,
                          }}
                          style={{ width: 52, height: 52, borderRadius: 50 }}
                        />
                      </Box>
                      <Box className="flex-1">
                        <Box className="border-b border-gray-200 pb-2">
                          <Text className="font-p600">
                            {chat.listingType === "buyer"
                              ? `Buyer Listing: ${chat.listingTitle}`
                              : `Seller Listing: ${chat.listingTitle}`}
                          </Text>
                          <Text className="text-gray-400">
                            ID: {chat.listingId}
                          </Text>
                        </Box>
                        <Text className="font-p600">{chat.recipientName}</Text>
                        <Text
                          numberOfLines={1}
                          className={
                            chat.unreadCount > 0
                              ? "text-gray-900 font-p500"
                              : "text-gray-500 font-p400"
                          }
                        >
                          {chat.lastMessage}
                        </Text>
                      </Box>
                    </Box>
                    <Box className="flex flex-col items-end ml-2">
                      <Text className="text-gray-400">
                        {formatTime(chat.lastMessageTime)}
                      </Text>
                      {chat.unreadCount > 0 && (
                        <Box className="bg-red-600 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                          <Text className="text-white">{chat.unreadCount}</Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default ChatList;

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import { InputField, Input, InputIcon } from "@/components/ui/input";
import { nanoid } from "nanoid/non-secure";
import { Button, ButtonText } from "@/components/ui/button";
import axios from "axios";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

const SingleChat = () => {
  const bid_id = "1";
  const URL = "http://localhost:3210";

  const [messages, setMessages] = useState<any[]>([]);
  const [msgTxt, setMsgTxt] = useState("");
  const [userId, setUserId] = useState("");
  const socket = io(URL);

  const fetchMessages = () => {
    // Join the order-specific chat room
    socket.emit("bid-chat", { bid_id });

    // Fetch chat history
    axios
      .get(`${URL}/test/chat/${bid_id}`)
      .then((res) => {
        setMessages(res.data.data);
        // console.log("res from axios", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Listen for new messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
      console.log("new msg", newMessage);
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      const value = jsonValue ? JSON.parse(jsonValue) : null;
      if (value !== null) {
        setUserId(value.user_id);
      }
    } catch (e) {
      console.log(e);
    }

    return () => socket.off("disconnect");
  };

  const onSend = () => {
    let dataObj = {
      msg_id: nanoid(10),
      bid_id: bid_id,
      sender_id: userId,
      msg_txt: msgTxt,
    };
    try {
      socket.emit("send-bid-msg", dataObj);
    } catch (error) {
      console.log(error);
    }
    setMsgTxt("");
    console.log("obg after send", messages);
  };

  useEffect(() => {
    getData();
    fetchMessages();
  }, []);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box>
          <Center className="flex items-center justify-center">
            <Text>Chats</Text>
          </Center>
          <Box className="felx self-end mb-12 mx-4">
            <ScrollView>
              {messages.map((msg) => (
                <Box key={msg.msg_id}>
                  <Text
                    className={`text-${
                      msg.sender_id == userId ? "right" : "left"
                    } m-1 bg-slate-400 p-2 rounded-lg font-p400 bg-${
                      msg.sender_id == userId ? "[#C0D85F]" : "[#4E7456]"
                    } text-${
                      msg.sender_id == userId ? "[#354040]" : "[#FCFFE0]"
                    }`}
                  >
                    {msg.msg_txt}
                  </Text>
                </Box>
              ))}
            </ScrollView>

            <Box className="mb-8 flex flex-row items-center justify-center w-full">
              <Input
                variant="outline"
                size="xl"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="bg-[#C0D85F] rounded-full flex"
              >
                <InputField
                  placeholder="Enter message here..."
                  value={msgTxt}
                  onChangeText={setMsgTxt}
                  className="flex-[89%]"
                />
                <TouchableOpacity
                  className="bg-[#4E7456] w-12 h-12 rounded-full justify-center items-center flex-[11%]"
                  onPress={onSend}
                >
                  <Feather name="arrow-right" size={24} color="#fff" />
                </TouchableOpacity>
              </Input>
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SingleChat;

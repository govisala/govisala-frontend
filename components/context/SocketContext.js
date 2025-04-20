import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const SocketContext = createContext();

// Custom hook to use the socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// Helper functions
const getUserId = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData).id;
    }
    return null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Socket Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socketInstance = null;

    const initSocket = async () => {
      try {
        const userId = await getUserId();
        const token = await getAuthToken();

        if (!userId || !token) {
          console.log("No user ID or token found, socket not initialized");
          return;
        }

        // Initialize socket connection
        socketInstance = io(process.env.EXPO_PUBLIC_API_URL, {
          query: { userId, token },
          transports: ["websocket"],
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socketInstance.on("connect", () => {
          console.log("Socket connected");
          setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
          console.log("Socket disconnected");
          setIsConnected(false);
        });

        socketInstance.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
        });

        socketInstance.on("error", (error) => {
          console.error("Socket error:", error);
        });

        setSocket(socketInstance);
      } catch (error) {
        console.error("Socket initialization error:", error);
      }
    };

    initSocket();

    // Cleanup
    return () => {
      if (socketInstance) {
        console.log("Disconnecting socket");
        socketInstance.disconnect();
      }
    };
  }, []);

  // Context value
  const value = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

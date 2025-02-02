import { Slot, Redirect, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import React from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from "expo-status-bar";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

const useAuth = () => {
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth Check Goes Here
    setTimeout(() => {
      const loggedInUser = { id: 1 }; // Change to `{ id: 1 }` for testing login state
      setUser(loggedInUser);
      setLoading(false);
    }, 1000);
  }, []);

  return { user, loading };
};

function Layout() {
  const [loaded, error] = useFonts({
    p400: Platform.OS == "android" ? Poppins_300Light : Poppins_400Regular,
    p500: Platform.OS == "android" ? Poppins_400Regular : Poppins_500Medium,
    p600: Platform.OS == "android" ? Poppins_500Medium : Poppins_600SemiBold,
  });

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/home"); // Redirect to tabs when logged in
      } else {
        router.replace("/login"); // Redirect to login if not logged in
      }
    }
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, user, loading]);

  if (!loaded && !error) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Slot />;
}

const RootLayout = () => {
  return (
    <GluestackUIProvider>
      <StatusBar style="dark" />
      <Layout />
    </GluestackUIProvider>
  );
};

export default RootLayout;

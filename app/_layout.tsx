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
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

const useAuth = () => {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth Check Goes Here
    setTimeout(async () => {
      await AsyncStorage.getItem("userData").then((value) => {
        let temp_user = value ? JSON.parse(value) : null;
        if (temp_user) {
          setUser(temp_user.user_id);
        }
      });
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
        router.replace("/(auth)"); // Redirect to login if not logged in
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

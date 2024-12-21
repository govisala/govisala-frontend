import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from "expo-status-bar";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text } from "@/components/ui/text";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    p400: Poppins_400Regular,
    p500: Poppins_500Medium,
    p600: Poppins_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => {
              return (
                <Text className="font-p500 text-xl">Welcome to GoviSala!</Text>
              );
            },
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerTitle: () => {
              return <Text className="font-p500 text-xl">Login</Text>;
            },
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerTitle: () => {
              return <Text className="font-p500 text-xl">Register</Text>;
            },
            headerBackVisible: false,
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}

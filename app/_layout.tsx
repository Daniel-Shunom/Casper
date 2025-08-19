import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/ctx/appctx/appctx";
import { useEffect } from "react";
import { useCentralRoomStore } from "@/ctx/stores/rooms/roomStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();
const mockrooms = [
  { id: "1", name: "Room 1", icon: "home" },
  { id: "2", name: "Room 2", icon: "user" },
  { id: "3", name: "Room 3", icon: "user" },
  { id: "4", name: "Room 4", icon: "user" },
  { id: "5", name: "Room 5", icon: "user" },
  { id: "6", name: "Room 6", icon: "cog" },
  { id: "7", name: "Room 7", icon: "star" },
  { id: "8", name: "Room 8", icon: "heart" },
  { id: "9", name: "Room 9", icon: "bell" },
  { id: "10", name: "Room 10", icon: "envelope" },
  { id: "11", name: "Room 11", icon: "music" },
  { id: "12", name: "Room 12", icon: "camera" },
  { id: "13", name: "Room 13", icon: "gamepad" },
  { id: "14", name: "Room 14", icon: "book" },
  { id: "15", name: "Room 15", icon: "coffee" },
];

export default function RootLayout() {
  const { setRoomsMetadata } = useCentralRoomStore()
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    setRoomsMetadata(mockrooms)
  }, [mockrooms])

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <SafeAreaProvider>
      <SessionProvider>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="chat" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </QueryClientProvider>
        </KeyboardProvider>
      </SessionProvider>
    </SafeAreaProvider>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}

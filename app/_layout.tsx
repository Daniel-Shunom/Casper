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
import { MockRoomMetadata } from "@/constants/mock/MockRoomMetadata";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/ctx/appctx/appctx";
import { useEffect } from "react";
import { useCentralRoomStore } from "@/ctx/stores/rooms/roomStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { setRoomsMetadata } = useCentralRoomStore()
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    setRoomsMetadata(MockRoomMetadata)
  }, [MockRoomMetadata])

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

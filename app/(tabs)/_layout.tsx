import {
  CasperExplore,
  CasperHome,
  CasperSettings,
} from "@/casper_icons/generated";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

const ICON_SIZE = 40;

export default () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarPosition: "bottom",
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#007AFF", // iOS blue or your brand color
        tabBarInactiveTintColor: "#8E8E93", // iOS gray
        tabBarStyle: {
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <CasperHome
              color={color}
              width={focused ? ICON_SIZE + 2 : ICON_SIZE}
              height={focused ? ICON_SIZE + 2 : ICON_SIZE}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <CasperExplore
              color={color}
              width={focused ? ICON_SIZE + 2 : ICON_SIZE}
              height={focused ? ICON_SIZE + 2 : ICON_SIZE}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <CasperSettings
              color={color}
              width={focused ? ICON_SIZE + 2 : ICON_SIZE}
              height={focused ? ICON_SIZE + 2 : ICON_SIZE}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

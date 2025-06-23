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
        tabBarShowLabel: true, 
        tabBarActiveTintColor: "#007AFF", // iOS blue or your brand color
        tabBarInactiveTintColor: "#8E8E93", // iOS gray
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: 6, 
          marginBottom: 0,
        },
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 80, 
          paddingBottom: Platform.OS === "ios" ? 25 : 15, 
          paddingTop: 8,
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
          paddingVertical: 2, 
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home", 
          tabBarBadge: '9',
          tabBarIcon: ({ color }) => (
            <CasperHome
              color={color}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: "Explore", 
          tabBarIcon: ({ color }) => (
            <CasperExplore
              color={color}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings", 
          tabBarIcon: ({ color }) => (
            <CasperSettings
              color={color}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          ),
        }}
      />
    </Tabs>
  );
};
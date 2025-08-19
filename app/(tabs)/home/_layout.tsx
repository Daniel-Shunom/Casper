import { useCentralMessageStore } from "@/ctx/stores/messages/messageStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Slot,
  useLocalSearchParams,
  useRouter
} from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Example dynamic data
const rooms = [
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
  // Add more rooms as needed
] as const;

export default () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const { Subscribe } = useCentralMessageStore()

  // Get the currently active room from the route parameters
  const activeRoomId = params.rooms as string;

  useEffect(() => {
    rooms.forEach(room => {
      Subscribe(room.id)
    })
  }, [rooms])

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Vertical Icon Menu */}
      <View style={styles.menu}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {rooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={[
                styles.iconButton,
                activeRoomId === room.id && styles.selected,
              ]}
              onPress={() => router.push(`/(tabs)/home/${room.id}`)}
            >
              <FontAwesome
                name={room.icon}
                size={28}
                color={activeRoomId === room.id ? "#7289da" : "#888"}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content Area */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#23272a",
          shadowColor: "#23272a",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
      >
        <Slot />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#23272a",
  },
  menu: {
    width: 70,
    backgroundColor: "#23272a",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconButton: {
    marginBottom: 20,
    padding: 8,
    borderRadius: 35,
    backgroundColor: "transparent",
  },
  selected: {
    backgroundColor: "#2c2f33",
  },
});

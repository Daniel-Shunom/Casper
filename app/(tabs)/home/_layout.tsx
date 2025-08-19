import { useCentralMessageStore } from "@/ctx/stores/messages/messageStore";
import { useCentralRoomStore } from "@/ctx/stores/rooms/roomStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Slot,
  useLocalSearchParams,
  useRouter
} from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const { roomsmetadata } = useCentralRoomStore()
  const { Subscribe } = useCentralMessageStore()

  // Get the currently active room from the route parameters
  const activeRoomId = params.rooms as string;

  useEffect(() => {
    roomsmetadata.forEach(room => {
      Subscribe(room.id)
    })
  }, [roomsmetadata])

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Vertical Icon Menu */}
      <View style={styles.menu}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {roomsmetadata.map((room) => (
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

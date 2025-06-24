import { CasperSad } from "@/casper_icons/generated";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NoRoomsScreen() {
  const ICON_SIZE = 150
  return (
    <View style={styles.container}>
      <CasperSad
        // color={color}
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
      <Text style={styles.title}>No Rooms Available</Text>
      <Text style={styles.subtitle}>
        You currently have no rooms. Please check back later or create a new
        room.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
    borderTopLeftRadius: 20
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
    opacity: 0.7,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 260,
  },
});

import TextBox from "@/components/TextInput";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";

export default function ChatIndex() {
  return (
    <View style={styles.inner}>
      <ScrollView
        contentContainerStyle={styles.main}
        keyboardShouldPersistTaps="handled"
      >
        {/* <Text style={styles.helloText}>Hello</Text> */}
        {/* Add your chat messages here */}
      </ScrollView>
      <TextBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
  },
  main: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  helloText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});

import TextBox from "@/components/TextInput";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatIndex() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c2f33" translucent={false} />
      
      <ScrollView
        contentContainerStyle={styles.main}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
      >
        {/* <Text style={styles.helloText}>Hello</Text> */}
        {/* Add your chat messages here */}
      </ScrollView>
      
      <View style={[styles.textBoxContainer, { paddingBottom: insets.bottom }]}>
        <TextBox />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#2c2f33", 
  },
  scrollView: {
    flex: 1,
  },
  main: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  textBoxContainer: {
    backgroundColor: "#2c2f33",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  helloText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
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
      </ScrollView>
      {/* TODO -> the offset here is dependent on the padding distance in the bottm
              fix this discrepancy asap */}
      <View style={[styles.textBoxContainer, { paddingBottom: insets.bottom - 10 }]}>
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
    backgroundColor: "#36393f",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  helloText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});
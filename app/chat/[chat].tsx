import HeaderNavigation from "@/components/HeaderNavigation";
import TextBox from "@/components/TextInput";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatIndex() {
  const insets = useSafeAreaInsets();
  const { chat } = useLocalSearchParams()
  
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderNavigation title="Hallo"/>
      <StatusBar barStyle="light-content" backgroundColor="#2c2f33" translucent={false} />
      <Text style={{backgroundColor: "#fff"}}>{chat}</Text>
      <ScrollView
        contentContainerStyle={styles.main}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
      >
      </ScrollView>
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

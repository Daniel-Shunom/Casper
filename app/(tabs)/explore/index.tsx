import { RoomInfo, UserName } from "@/api/types/types";
import MemberCard from "@/components/MemberCard";
import Message from "@/components/MessageCard";
import RoomCard from "@/components/RoomCard";
import TextBox from "@/components/TextInput";
import React from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function DemoScreen() {
  const val: RoomInfo = {
    roomcapacity: 1,
    roomdesc: "a demo room for noobs",
    roomname: "tester",
    roomowner: "@daniel",
  };
  const member = {
    username: "@demo_user" as UserName,
    userdesc: { None: null },
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <ScrollView contentContainerStyle={styles.main}>
            <Message
              userid="demo"
              username="demo"
              content="demo is a name of an object, place or thing, that does not mean that it is goood, but rather that in that time, place, and moment, you get to be you. You get to be you and show the world your work. This is good & oka"
            />
            <RoomCard info={val} />
            <MemberCard info={member} />
          </ScrollView>
          <TextBox />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  },
});

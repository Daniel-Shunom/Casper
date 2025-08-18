import { useSession } from "@/ctx/appctx/appctx";
import { useMessageStore } from "@/ctx/stores/messages/messageStore";
import { Slot, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function () {
  const { chat } = useLocalSearchParams()
  const { set_roomid, set_userid } = useMessageStore()
  const { getUserid } = useSession()

  useEffect(() => {
    set_roomid(chat as string)
    set_userid(getUserid())
  }, [])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Slot />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

import { useSession } from "@/ctx/appctx/appctx";
import { RoomSessionProvider } from "@/ctx/roomctx/roomctx";
import { useCentralMessageStore } from "@/ctx/stores/messages/messageStore";
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

  /// note to self ->
  /// the following code is verbose for the sake of not
  /// abusing the rule of hooks. We can add in beter types
  /// down the line, but it is 11:44 pm, and I am tired :)

  const handler = useCentralMessageStore()
    .getRoomHandler(chat as string)

  const storeInstance = handler && 'Some' in handler 
    ? handler.Some 
    : null 

  const messageStore = storeInstance
    ? storeInstance()
    : null
    
  const { getUserid } = useSession()

  
  useEffect(() => {
    if (messageStore) {
      messageStore.set_roomid(chat as string)
      messageStore.set_userid(getUserid())
    }
  }, [])

  return (
    <RoomSessionProvider roomid={chat as string}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Slot />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </RoomSessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

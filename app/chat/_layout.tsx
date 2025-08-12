import { Slot } from "expo-router";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function () {
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

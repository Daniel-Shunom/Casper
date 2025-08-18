import { CasperSend } from "@/casper_icons/generated";
import { useMessageStore } from "@/ctx/stores/messages/messageStore";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const TextBox: React.FC = () => {
  const [inputHeight, setInputHeight] = useState(44); // Default height
  const [input, setInput] = useState<string>("")

  const { enqueue_message } = useMessageStore()

  const quickActions = [
    { id: 1, label: "GIF", icon: require("@/assets/icons/send.png") },
    { id: 2, label: "Sticker", icon: require("@/assets/icons/send.png") },
    { id: 3, label: "Emoji", icon: require("@/assets/icons/send.png") },
    { id: 4, label: "File", icon: require("@/assets/icons/send.png") },
  ];

  const HandleSubmit = () => {
    enqueue_message(input)
    setInput("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Quick Action Buttons */}
        <View style={styles.buttonList}>
          {quickActions.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              android_ripple={{ color: "#5865f2", borderless: true }}
            >
              <Image
                source={item.icon}
                style={styles.buttonIcon}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Message Input Container */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="type a message..."
            placeholderTextColor="#72767d"
            multiline={true}
            scrollEnabled={true}
            style={[styles.textInput, { height: Math.max(44, inputHeight) }]}
            dataDetectorTypes={'all'}
            enablesReturnKeyAutomatically={true}
            onContentSizeChange={(e) => {
              const h = e.nativeEvent.contentSize.height;
              setInputHeight(Math.min(Math.max(h, 44), 120));
            }}
            value={input}
            maxLength={2000}
            returnKeyType="default"
            autoCorrect
            autoCapitalize="sentences"
            onChangeText={setInput}
            textAlign="left"
            selectionColor="#5865f2"
          />

          {/* Send Button */}
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              pressed && styles.sendButtonPressed,
            ]}
            onPress={HandleSubmit}
          >
            <CasperSend width={20} height={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36393f",
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    gap: 12,
  },
  buttonList: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#40444b",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonPressed: {
    backgroundColor: "#5865f2",
    transform: [{ scale: 0.95 }],
  },
  buttonIcon: {
    width: 16,
    height: 16,
    tintColor: "#dcddde",
  },
  buttonText: {
    fontSize: 13,
    color: "#dcddde",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#40444b",
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    color: "#dcddde",
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 12,
    textAlignVertical: "top",
    minHeight: 44,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#5865f2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    shadowColor: "#5865f2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonPressed: {
    backgroundColor: "#4752c4",
    transform: [{ scale: 0.9 }],
  },
});

export default TextBox;

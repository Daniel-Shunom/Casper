import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const TextBox: React.FC = () => {
  const [inputHeight, setInputHeight] = useState(44); // Default height
  
  const quickActions = [
    { id: 1, label: 'GIF', icon: require('@/assets/icons/send.png') },
    { id: 2, label: 'Sticker', icon: require('@/assets/icons/send.png') },
    { id: 3, label: 'Emoji', icon: require('@/assets/icons/send.png') },
    { id: 4, label: 'File', icon: require('@/assets/icons/send.png') },
  ];

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
                pressed && styles.buttonPressed
              ]}
              android_ripple={{ color: '#5865f2', borderless: true }}
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
            placeholder="Message #general"
            placeholderTextColor="#72767d"
            style={[styles.textInput, { height: Math.max(44, inputHeight) }]}
            scrollEnabled={inputHeight >= 120}
            submitBehavior="submit"
            onEndEditing={() => {}}
            multiline={true}
            autoCorrect={true}
            maxLength={2000}
            returnKeyType="send"
            contextMenuHidden={false}
            // @ts-expect-error
            enableFocusRing={false}
            autoCapitalize="sentences"
            textAlign="left"
            selectionColor="#5865f2"
            onContentSizeChange={(event) => {
              const height = event.nativeEvent.contentSize.height;
              setInputHeight(Math.min(Math.max(height, 44), 120));
            }}
            // Remove focus outline/border
            underlineColorAndroid="transparent"
            blurOnSubmit={false}
          />
          
          {/* Send Button */}
          <Pressable 
            style={({ pressed }) => [
              styles.sendButton,
              pressed && styles.sendButtonPressed
            ]}
          >
            <Image 
              source={require('@/assets/icons/send.png')} 
              style={styles.sendIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36393f",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#202225",
  },
  content: {
    gap: 12,
  },
  buttonList: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#40444b",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
    tintColor: '#dcddde', // This will color your icons to match Discord's theme
  },
  buttonText: {
    fontSize: 13,
    color: '#dcddde',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: "#40444b",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    color: "#dcddde",
    outline: 'none',
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 12,
    paddingHorizontal: 0,
    minHeight: 44,
    textAlignVertical: 'top', // Align text to top for multiline
    // Remove all borders and outlines
    borderWidth: 0,
    outlineWidth: 0,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonPressed: {
    backgroundColor: "#4752c4",
    transform: [{ scale: 0.9 }],
  },
  sendIcon: {
    width: 18,
    height: 18,
    tintColor: '#ffffff',
  },
});

export default TextBox;
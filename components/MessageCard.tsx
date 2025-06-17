import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Message {
  username: string;
  userid: string;
  content: string;
  timestamp?: string;
}

const Message: React.FC<Message> = ({
  username,
  userid,
  content,
  timestamp,
}) => {
  const getAvatarColor = (userid: string) => {
    const colors = [
      "#f04747",
      "#7289da",
      "#43b581",
      "#faa61a",
      "#f47fff",
      "#00d4aa",
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
    ];
    const hash = userid.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  // Get initials from username
  const getInitials = (username: string) => {
    return username
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = () => {
    if (timestamp) return timestamp;
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageWrapper}>
        <View
          style={[styles.avatar, { backgroundColor: getAvatarColor(userid) }]}
        >
          <Text style={styles.avatarText}>{getInitials(username)}</Text>
        </View>
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.timestamp}>{formatTime()}</Text>
          </View>
          <Text style={styles.messageText}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    backgroundColor: "transparent",
  },
  messageWrapper: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 1,
    borderRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    flexShrink: 0,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  messageContent: {
    flex: 1,
    minWidth: 0,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
    flexWrap: "wrap",
  },
  username: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
    flexShrink: 0,
  },
  timestamp: {
    color: "#72767d",
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 4,
  },
  messageText: {
    color: "#dcddde",
    fontSize: 16,
    lineHeight: 22,
    flexWrap: "wrap",
    maxWidth: 600,
  },
});

export default Message;

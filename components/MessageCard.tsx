import React from "react";
import { StyleSheet, Text, View } from "react-native";
interface Message {
  username: string;
  userid: string;
  content: string;
}

const MessageCard: React.FC<Message> = ({ username, userid, content }) => {
  return (
    <React.Fragment>
      <View style={styles.body}>
        <View style={styles.avatar}>{/*USER AVATAR*/}</View>
        <View style={styles.content}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.message}>{content}</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  body: {},
  avatar: {},
  content: {},
  username: {},
  message: {},
});

export default MessageCard;

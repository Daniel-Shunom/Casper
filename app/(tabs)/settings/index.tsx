import { ScrollView, StyleSheet, Text } from "react-native";

export default () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.desc}>Hi brother</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#d9d9d9'
  },
  desc: {
    color: "#fff",
  },
});

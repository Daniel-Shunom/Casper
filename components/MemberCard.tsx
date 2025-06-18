import { UserName } from "@/api/types/types";
import { StyleSheet, Text, View } from "react-native";

interface MemberCardProps {
  username: UserName;
  userdesc: Option<string>;
}

const MemberCard: React.FC<{ info: MemberCardProps }> = ({ info }) => {
  const desc = "Some" in info.userdesc ? info.userdesc.Some : "no description";
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
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.usericon,
          { backgroundColor: getAvatarColor(info.username) },
        ]}
      >
        <Text>#</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{info.username}</Text>
        <Text style={styles.description}>{desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    width: 300,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 1,
  },
  content: {
    flexDirection: "column",
  },
  usericon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5865f2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    flexShrink: 0,
  },
  username: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
    flexShrink: 0,
  },
  description: {
    color: "#72767d",
    fontSize: 12,
    fontWeight: "500",
    flexWrap: "wrap",
  },
});

export default MemberCard;

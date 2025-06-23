import { CasperInTheWind } from "@/casper_icons/generated";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from "react-native";
import { User } from "../api/types/types";

const ProfileCard: React.FC<{ props: User }> = ({ props }) => {
  const ICON_SIZE = 60
  return (
    <View style={styles.container}>
      {/* Edit icon positioned at top right */}
      <View style={styles.editIconContainer}>
        <MaterialIcons name="edit" size={24} color="#b9bbbe" />
      </View>
      
      {/* Header with avatar and basic info */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <CasperInTheWind width={ICON_SIZE} height={ICON_SIZE} style={styles.avatar}/>
          <View
            style={[styles.statusIndicator, { backgroundColor: "#43b581" }]}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.displayName}>{props.name.first + " " + props.name.last}</Text>
          <Text style={styles.username}>{props.username}</Text>
          <Text style={styles.status}>Online</Text>
        </View>
      </View>
     
      {/* User description section */}
      <View style={styles.userdesccontainer}>
        <Text style={styles.userdescription}>{props.userdesc}</Text>
      </View>
     
      {/* User details section */}
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member since</Text>
          <Text style={styles.infoValue}>{props.joined}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>User ID</Text>
          <Text style={styles.infoValue}>{props.userid}</Text>
        </View>
        <>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{props.username}</Text>
          </View>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "column",
    borderRadius: 20,
    backgroundColor: "#2c2f33",
    padding: 10,
  },
  editIconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7289da",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#2c2f33",
  },
  userInfo: {
    flex: 1,
    paddingRight: 35, // Add padding to prevent overlap with edit icon
  },
  displayName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: "#b9bbbe",
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: "#43b581",
    fontWeight: "500",
  },
  userdesccontainer: {
    backgroundColor: "#36393f",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  userdescription: {
    color: "#dcddde",
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  info: {
    backgroundColor: "#36393f",
    borderRadius: 10,
    padding: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#b9bbbe",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#dcddde",
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#4f545c",
    marginVertical: 4,
  },
});

export default ProfileCard;
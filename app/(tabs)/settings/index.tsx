import { User } from "@/api/types/types";
import ProfileCard from "@/components/ProfileCard";
import UnivItemMenu from "@/components/UnivItemMenu";
import { ScrollView, StyleSheet } from "react-native";

export default () => {
  let demo: User = {
    name: { first: "Daniel", last: "Jeremiah" },
    username: "@danieljeremiah",
    userpronouns: "He/Him",
    userdesc: "A small guy from xyz town who just likes to party",
    userauth: true,
    usergender: "cisgender",
    userid: "lntl-user-ramAD834B34H",
    userdob: { day: 15, month: 2, year: 2002 },
    joined: "January, 2025",
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileCard props={demo} />
      <UnivItemMenu title="Rooms" subtitle="configure your rooms" modalType="half">
        <ProfileCard props={demo} />
      </UnivItemMenu>
      <UnivItemMenu title="Rooms" subtitle="configure your rooms" modalType="half">
        <ProfileCard props={demo} />
      </UnivItemMenu>
      <UnivItemMenu title="Rooms" subtitle="configure your rooms" modalType="half">
        <ProfileCard props={demo} />
      </UnivItemMenu>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#d9d9d9',
    paddingHorizontal: 20,
    gap: 10,
  },
  desc: {
    color: "#fff",
  },
});

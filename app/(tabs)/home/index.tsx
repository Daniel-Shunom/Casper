import { RoomInfo, UserName } from "@/api/types/types";
import MemberCard from "@/components/MemberCard";
import Message from "@/components/MessageCard";
import RoomCard from "@/components/RoomCard";
import TextBox from "@/components/TextInput";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const val: RoomInfo = {
    roomcapacity: 1,
    roomdesc: 'a demo room for noobs',
    roomname: 'tester',
    roomowner: '@daniel'
  };
  const member = {
    username: "@demo_user" as UserName,
    userdesc: { None: null }
  }
  
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Message
        userid="demo"
        username="demo"
        content="demo is a name of an object, place or thing, that does not mean that it is goood, but rather that in that time, place, and moment, you get to be you.You get to be you and show the orld your work. This is good &\n\n oka"
      />
      <RoomCard info={val} />
      <MemberCard info={member}/>
      <TextBox />
    </ScrollView>
  );
}
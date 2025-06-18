import { RoomInfo, UserName } from "@/api/types/types";
import MemberCard from "@/components/MemberCard";
import Message from "@/components/MessageCard";
import RoomCard from "@/components/RoomCard";
import TextBox from "@/components/TextInput";
import { StyleSheet, View } from "react-native";
import Animated, {
  scrollTo,
  useAnimatedKeyboard,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

export default function HomeScreen() {
  const val: RoomInfo = {
    roomcapacity: 1,
    roomdesc: "a demo room for noobs",
    roomname: "tester",
    roomowner: "@daniel",
  };
  const member = {
    username: "@demo_user" as UserName,
    userdesc: { None: null },
  };

  const keyboard = useAnimatedKeyboard();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  const animatedScrollContentStyle = useAnimatedStyle(() => ({
    paddingBottom: keyboard.height.value, 
  }));

  useAnimatedReaction(
    () => keyboard.height.value,
    (keyboardHeight, previousKeyboardHeight) => {
      if (keyboardHeight > 0 && previousKeyboardHeight === 0) {
        scrollTo(scrollRef, 0, 1000, true); 
      }
    }
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, animatedContainerStyle]}>
        <Animated.ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={animatedScrollContentStyle}
          onScroll={(event) => {
            scrollOffset.value = event.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
        >
          <Message
            userid="demo"
            username="demo"
            content="demo is a name of an object, place or thing, that does not mean that it is goood, but rather that in that time, place, and moment, you get to be you.You get to be you and show the orld your work. This is good &\n\n oka"
          />
          <RoomCard info={val} />
          <MemberCard info={member} />
        </Animated.ScrollView>
        
        <View style={styles.textBoxContainer}>
          <TextBox />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393f', 
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  textBoxContainer: {
    backgroundColor: '#36393f', 
  },
});
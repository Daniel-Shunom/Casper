import { Message as msg } from "@/api/types/types";
import { useSession } from "@/ctx/appctx/appctx";
import { useRoomSession } from "@/ctx/roomctx/roomctx";
import { useCentralMessageStore } from "@/ctx/stores/messages/messageStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import Message from "../MessageCard";

export default function MessagesLayout(): React.JSX.Element {
  const { getUsername } = useSession()

  const { chat } = useLocalSearchParams()

  const { roomid } = useRoomSession()

  const handler = useCentralMessageStore()
    .getRoomHandler(roomid)

  /// note to self ->
  /// the following code is verbose for the sake of not
  /// abusing the rule of hooks. We can add in beter types
  /// down the line, but it is 11:44 pm, and I am tired :)

  const storeInstance = handler && 'Some' in handler 
    ? handler.Some 
    : null 

  const messageStore = storeInstance
    ? storeInstance()
    : null

  const message_queue: msg[] = messageStore
    ? messageStore.message_queue : [
      { userid: "asdsd", roomid: chat as string, content: "foobar", authenticated: true}
    ]

  const ref = useRef<FlatList<Message>>(null)

  const renderItem = ({item}: {item: Message}) => {
    return <Message 
      username={getUsername()}
      userid={item.userid}
      content={item.content}
    /> 
  }

  useEffect(() => {
    if (ref.current && message_queue.length > 0) {
      ref.current.scrollToEnd({ animated: true })
    }
  }, [message_queue])

  return (
    <Animated.FlatList<Message> 
      ref={ref}
      //@ts-ignore
      data={message_queue}
      keyExtractor={(item, index) => item.userid + index.toString()}
      renderItem={renderItem}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
      itemLayoutAnimation={LinearTransition}
    />
  )
}

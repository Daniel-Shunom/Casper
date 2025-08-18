import { useSession } from "@/ctx/appctx/appctx";
import { useMessageStore } from "@/ctx/stores/messages/messageStore";
import Message from "../MessageCard";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useEffect, useRef } from "react";
import { FlatList, ScrollView } from "react-native-reanimated/lib/typescript/Animated";

export default function MessagesLayout(): React.JSX.Element {
  const { message_queue } = useMessageStore()
  const { getUsername } = useSession()

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

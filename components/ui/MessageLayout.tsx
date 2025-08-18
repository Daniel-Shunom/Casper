import { useSession } from "@/ctx/appctx/appctx";
import { useMessageStore } from "@/ctx/stores/messages/messageStore";
import Message from "../MessageCard";

export default function MessagesLayout(): React.JSX.Element {
  const { message_queue } = useMessageStore()
  const { getUsername } = useSession()

  return (
    <>
      {message_queue.map(message => {
        return (
          <Message
            userid={message.userid}
            username={getUsername()}
            content={message.content}
          />
        )
      })}
    </>
  )
}

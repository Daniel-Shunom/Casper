
import * as zus from 'zustand'
import { Message } from '@/api/types/types'
import { joinRoom } from '@/api/api'

export type MsgSuccess = 'success'
export type MsgError =
  | 'failed to send'
  | 'something went wrong'
  | 'connection error'

interface MessageState {
  loading: boolean
  ws_connection: Option<WebSocket>
  message_queue: Message[]
  retry_queue: Message[]
  crash_queue: Message[]
  new_connection: (userid: string, roomid: string) => void
  send_message: (msg: string) => Result<MsgSuccess, MsgError>
}

export const useMessageStore = zus.create<MessageState>((set, get) => ({
  loading: false,
  ws_connection: { None: null },
  message_queue: [],
  retry_queue: [],
  crash_queue: [],

  new_connection: (userid, roomid) => {
    const socket = joinRoom(roomid, userid)
    set({ ws_connection: { Some: socket } })
  },

  send_message: (msg) => {
    const wsOpt = get().ws_connection

    if ('None' in wsOpt) {
      return { Error: 'connection error' }
    }

    const socket = wsOpt.Some

    try {
      socket.send(msg)
      return { Ok: 'success' }
    } catch (err) {
      console.error(err)
      return { Error: 'failed to send' }
    }
  },
}))


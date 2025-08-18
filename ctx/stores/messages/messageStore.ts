
import * as zus from 'zustand'
import { Message } from '@/api/types/types'
import { joinRoom } from '@/api/api'
import { BounceInLeft } from 'react-native-reanimated'

export type MsgSuccess = 'success'
export type MsgError =
  | 'failed to send'
  | 'something went wrong'
  | 'connection error'

interface MessageState {
  loading: boolean
  authenticated: boolean 
  userid: Option<string>
  roomid: Option<string>
  ws_connection: Option<WebSocket>
  message_queue: Message[]
  retry_queue: Message[]
  enqueue_message: (content: string) => void
  set_roomid: (id: string) => void
  get_roomid: () => string
  set_userid: (id: string) => void
  get_userid: () => string
  new_connection: (userid: string, roomid: string) => void
  send_message: (msg: string) => Result<MsgSuccess, MsgError>
}

export const useMessageStore = zus.create<MessageState>((set, get) => ({
  loading: false,

  authenticated: false,
  
  userid: { None: null },

  roomid: { None: null },

  ws_connection: { None: null },

  message_queue: [],

  retry_queue: [],

  set_userid: (id) => {
     set({ userid: { Some: id} }) 
  },

  get_userid: () => {return ""},

  set_roomid: (id) => {
    set({ roomid: { Some: id } }) 
  },

  get_roomid: () => {
    let roomid = get().roomid

    return 'Some' in roomid
      ? roomid.Some
      : "not-an-id"
  },

  enqueue_message: (content) => {
    const roomid = get().roomid
    const userid = get().userid
    if ('Some' in roomid && 'Some' in userid) {

      set(state => ({
        message_queue: [
          ...state.message_queue,
          {
            userid: userid.Some,
            roomid: roomid.Some,
            content: content,
            authenticated: state.authenticated
          }
        ] 
      }))

    }
  },

  new_connection: (userid, roomid) => {
    const socket = joinRoom(roomid, userid)
    set({ ws_connection: { Some: socket } })
  },

  send_message: (msg) => {
    const wsOpt = get().ws_connection

    if ('None' in wsOpt) {
      return { Error: 'connection error' }
    }
    
    const roomid = get().roomid
    const userid = get().userid
    if ('Some' in roomid && 'Some' in userid) {

      set(state => ({
        message_queue: [
          ...state.message_queue,
          {
            userid: userid.Some,
            roomid: roomid.Some,
            content: msg,
            authenticated: state.authenticated
          }
        ] 
      }))

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


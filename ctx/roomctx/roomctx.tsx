import React, {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react'

const RoomContext = createContext<{
  roomid: string
}>({
  roomid: ""
})

export const useRoomSession = () => {
  const value = useContext(RoomContext)

  if (process.env.NODE_ENV !== "production") {
    if (!value) throw new Error("must be wrapped in </RoomSessionProvider")
  }

  return value
}

type RoomSessionProviderProps = PropsWithChildren<{
  roomid: string
}>

export function RoomSessionProvider(
  { children, roomid }: RoomSessionProviderProps, 
) {
  return (
    <RoomContext.Provider value={{
      roomid: roomid
    }}>
      {children}
    </RoomContext.Provider>
  ) 
}

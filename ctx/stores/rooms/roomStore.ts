import * as zus from 'zustand'

interface CentralRoomState {
  roomsmetadata: Array<RoomMetadata>
  setRoomsMetadata: (metadata: RoomMetadata | Array<RoomMetadata>) => void
  getRoomMetadata: (roomid: string) => Option<RoomMetadata> 
}

export const useCentralRoomStore = zus.create<CentralRoomState>((set, get) => ({
  roomsmetadata: [],

  setRoomsMetadata: (metadata) => {
    set(() => {
      const newMtd = Array.isArray(metadata)
        ? metadata
        : [metadata]
      return { roomsmetadata: newMtd }
    })
  },

  getRoomMetadata: (id) => {
    let metadata = get().roomsmetadata.find(metadata => {
      return metadata.id === id
    })

    return metadata
    ? { Some: metadata } 
    : { None: null }
  }

}))


//types
export type RoomMetadata = {
  id: string,
  name: string,
  icon: string,
}

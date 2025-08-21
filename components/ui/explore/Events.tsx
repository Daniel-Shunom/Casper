import { View, StyleSheet, Text } from 'react-native'
import { CasperEvent } from "@/api/types/types";
import EventCard from "@/components/EventCard";
import { MockEvents } from "@/constants/mock/MockEventsData";
import { FlatList } from "react-native-gesture-handler";

type CasperEventChunk = CasperEvent[][]
function ChunkEventsArray(events: CasperEvent[]): CasperEventChunk {
  let container: CasperEventChunk = []
  for (let i: number = 0; i < events.length; i += 3) {
    const chunk = events.slice(i, i + 3)
    container.push(chunk)
  }

  return container;
}

const PADDING = 8
export default function EventsTray(): React.JSX.Element {
  const ChunkedMockEvents = ChunkEventsArray(MockEvents)
  
  function renderer({ item }: { item: CasperEvent[] }) {
    return (
      <View style={{ padding: PADDING, gap: 12 }}>
        {item.map((event, index) => {
          return (
            <EventCard 
              event={event}
              style={{ marginVertical: 4 }}
              id={index.toString()}
            />
          )
        })}
      </View>
    )
  }

  return (
    <View>
    <Text style={styles.title}>Events</Text>
    <FlatList 
      data={ChunkedMockEvents}
      keyExtractor={(_item, index) => {
        return index.toString()
      }}
      renderItem={renderer} 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginLeft: PADDING,
  },

})

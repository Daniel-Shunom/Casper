import { 
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'

import GenreCard from '@/components/GenreCard'
import { ChatTopic, MockChatTopics } from '@/constants/mock/MockExploreGenre'

const PADDING = 8
export default function TopicsTray(): React.JSX.Element {

  function renderer({ item }: { item: ChatTopic }) {
    return <GenreCard title={item.title}/>
  }
  
  const separator = () => (
    <View style={{ padding: PADDING }}/>
  )
  
  const emptycomponent = () => (
    <GenreCard title="empty copmonent" />
  )

  return (
    <View>
    
    <Text style={styles.genretitle}>
      Popular topics 
    </Text>
    <FlatList<ChatTopic> 
      data={MockChatTopics}
      keyExtractor={(item, index) => {
        return item.title + index.toString()
      }}
      style={{padding: PADDING}}
      ListEmptyComponent={emptycomponent}
      ItemSeparatorComponent={separator}
      showsHorizontalScrollIndicator={false}
      renderItem={renderer}
      horizontal={true}
    />
    </View>
  )
}


const styles = StyleSheet.create({
  genretitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginLeft: PADDING,
  }
  
})

import { View, ViewProps, StyleSheet, Text } from 'react-native'

interface TopicCardProps extends ViewProps {
  topic: string
}

export default function TopicCard({ topic }: TopicCardProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.topic}>#{topic}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    padding: 4,
    backgroundColor: '#f2ab4c',
    borderRadius: 4,
  },

  topic: {
    fontSize: 16,
    fontWeight: 600,
    color: '#5ba12ae'
  },

})

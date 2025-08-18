import { 
  View, 
  ViewProps, 
  StyleSheet, 
  Text 
} from 'react-native'

interface EventCardProps extends ViewProps {
  event: string
}

export default function EventCard({ event }: EventCardProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>{event}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16
  }
})

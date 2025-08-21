import { CasperEvent, CasperEventCategory } from '@/api/types/types'
import { CasperMindingBusiness, CasperSleeping, CasperWavingWithLaptop, CasperWhatAreYouUpTo } from '@/casper_icons/generated'
import { 
  View,
  Pressable,
  ImageBackground,
  ViewProps, 
  StyleSheet, 
  Text 
} from 'react-native'
import * as Haptics from 'expo-haptics'

interface EventCardProps extends ViewProps {
  event: CasperEvent
}

function CategoryToCasper(category: CasperEventCategory): React.JSX.Element {
  switch (category) {
    case 'Social':
      return <CasperWhatAreYouUpTo /> 
      
    case 'Game':
      return <CasperWavingWithLaptop />

    case 'Movie':
      return <CasperSleeping />

    case 'Custom':
      return <CasperMindingBusiness />
  }
}

export default function EventCard({ event }: EventCardProps): React.JSX.Element {

  function hapticFeedback() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  return (
    <Pressable 
      style={styles.container}
      onLongPress={hapticFeedback}
    >
      <View style={styles.main}>
      <ImageBackground 
        style={styles.image}
      />

      <View>
        {CategoryToCasper(event.category)}
        <Text style={styles.title}>{event.title}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={styles.desc}>{event.description}</Text>
      </View>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttontext}>join</Text>
      </Pressable> 

    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    width: 350,
    alignItems: 'center',
  },

  main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  image: {
    width: 70,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  desc: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    maxWidth: 100
  },

  button: {
    backgroundColor: '#4443AE',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  buttontext: {
    color: '#fff',
    fontWeight: '600'
  },
  
})

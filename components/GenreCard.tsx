import { 
  ViewProps, 
  StyleSheet, 
  Text, 
  ImageBackground,
} from 'react-native'

const TMP_IMG_URL = "https://picsum.photos/200" 
interface GenreCardProps extends ViewProps {
  title: string,
  imgpath?: string
}

export default function GenreCard({ title, imgpath }: GenreCardProps): React.JSX.Element {
  return (
    <ImageBackground 
      style={styles.container}
      imageStyle={{ borderRadius: 16 }}
      source={{ uri: TMP_IMG_URL}}
      resizeMode='cover'
      resizeMethod='scale'
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.blurb}>Some minor blurb</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex:1,
    borderRadius: 8,
  },

  container: {
    height: 200,
    width: 300,
    flexDirection: 'column',
    alignContent: 'space-between',
    borderRadius: 8,
    padding: 6,
  },

  title: {
    fontSize: 20,
    fontWeight: '400'
  },

  blurb: {
    alignContent: 'flex-end',
    flexDirection: 'row-reverse'
  }

})

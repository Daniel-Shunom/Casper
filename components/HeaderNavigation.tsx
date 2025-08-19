import { 
  View,
  StyleSheet, 
  Text,
  TouchableOpacity
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { useRoomSession } from "@/ctx/roomctx/roomctx";
import { useCentralRoomStore } from "@/ctx/stores/rooms/roomStore";

interface HeaderNavigationProps {
  onBack?: () => void
  child?: React.JSX.Element
}

export default function HeaderNavigation({
  onBack,
  child,
}: HeaderNavigationProps) {
  const navigator = useNavigation()
  const { roomid } = useRoomSession()
  const roometadata = (() => {
    const option = useCentralRoomStore().getRoomMetadata(roomid)
    return 'Some' in option
    ? option.Some
    : { id: "random", name: "Hallo", icon: "book"} 
  })()

  function navigate() {
    onBack ? onBack() : navigator.goBack()
  }

  return(
    <View style={styles.main}>
      <TouchableOpacity style={styles.backButton} onPress={navigate} activeOpacity={0.7}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{roometadata.name}</Text>
      </View>
      
      <View style={styles.child}>
        {child}
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  child: {
    minWidth: 40, 
    alignItems: 'flex-end',
  },
})

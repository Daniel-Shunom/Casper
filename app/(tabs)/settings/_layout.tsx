import { Slot } from "expo-router"
import { SafeAreaView, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
export default () => {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={[styles.container, { marginTop: insets.top + 20 }]}>
      <Slot />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
})
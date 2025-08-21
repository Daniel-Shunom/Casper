import { Stack } from "expo-router";

export default () => {
  // note to self ->
  // pass in a function to handler the string value
  // in the native text.

  return (
    <Stack screenOptions={{
      title: "Explore",
      headerLargeTitle: true,
      headerStyle: { backgroundColor: '#afd32e'},
      headerBlurEffect: 'regular',
      sheetExpandsWhenScrolledToEdge: true,
      headerSearchBarOptions: {
        placeholder: "Explore Casper",
        hideWhenScrolling: false,
        onChangeText: (_ev) => {},
        onSearchButtonPress: (_ev) => {}
      }
    }}>
    </Stack>

  )
}

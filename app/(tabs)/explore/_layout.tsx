import { Stack } from "expo-router";
import { useState } from "react";

export default () => {
  const [input, setInput] = useState<string>("")

  return (
    <Stack screenOptions={{
      title: "Explore",
      headerLargeTitle: true,
      headerBlurEffect: 'regular',
      headerTransparent: true,
      headerSearchBarOptions: {
        placeholder: "Explore Casper",
        hideWhenScrolling: false,
        onChangeText: (_text) => {},
        onSearchButtonPress: (_opt) => {}
      }
    }}/>

  )
}

import { Stack } from "expo-router";

export default () => {
  return (
    <Stack screenOptions={{
      title: "Explore",
      headerLargeTitle: true,
      headerBlurEffect: 'regular',
      headerTransparent: true,
      headerSearchBarOptions: {
        placeholder: "Explore Casper",
        hideWhenScrolling: false,
      }
    }}/>

  )
}

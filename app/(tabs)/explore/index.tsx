import EventCard from "@/components/EventCard";
import GenreCard from "@/components/GenreCard";
import TopicCard from "@/components/TopicCard";
import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView
} from "react-native";

export default function DemoScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <GenreCard title="demo-genre" />
      <TopicCard topic="foofighters" />
      <EventCard event="demp-event" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

import TopicCard from "@/components/TopicCard";
import EventsTray from "@/components/ui/explore/Events";
import TopicsTray from "@/components/ui/explore/TopicsTray";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView
} from "react-native";


export default function DemoScreen() {
  return (
    <ScrollView 
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
    >
      <SafeAreaView />
      <TopicsTray />
      <EventsTray />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },

})

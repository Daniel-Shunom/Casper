import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  const { rooms } = useLocalSearchParams();
  
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>

    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#2c2f33' 
      // Dark background to match the theme
    }}>
      <Text style={{ color: '#ffffff', fontSize: 18 }}>
        Room ID: {rooms}
      </Text>
    </View>
      </SafeAreaView>
  );
};
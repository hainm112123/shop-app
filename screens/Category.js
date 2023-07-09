import { View, Text } from "react-native";

export default function Category({ route }) {
  const { title } = route.params;

  return (
    <View> 
      <Text> {title} </Text> 
    </View>
  )
}
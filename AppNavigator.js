import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Categories from "./screens/Categories";
import Category from "./screens/Category";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen 
        name="Category" 
        component={Category} 
        options={({ route }) => ({
          title: route.params.title,
        })}
      /> 
    </Stack.Navigator>
  )
}

export default AppNavigator;
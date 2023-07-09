import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import Categories from "./screens/Categories";
import Category from "./screens/Category";
import Cart from "./screens/Cart";
import Orders from "./screens/Orders";
import Settings from "./screens/Settings";

const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
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

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  )
}

const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  )
}

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'CategoriesStack') {
            iconName = 'home-outline'
          }
          else if (route.name === 'CartStack') {
            iconName = 'cart-outline'
          }
          else if (route.name === 'OrdersStack') {
            iconName = 'receipt-outline'
          }
          else {
            iconName = 'settings-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="CategoriesStack" component={CategoriesStack} />
      <Tab.Screen name="CartStack" component={CartStack} />
      <Tab.Screen name="OrdersStack" component={OrdersStack} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} />
    </Tab.Navigator>
  )
}

export default AppNavigator;
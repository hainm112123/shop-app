import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import Categories from "./screens/Categories";
import Category from "./screens/Category";
import Cart from "./screens/Cart";
import Orders from "./screens/Orders";
import Settings from "./screens/Settings";
import colorConfig from "./configs/colorConfig";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: colorConfig.headerBg,
        },
        headerTintColor: colorConfig.headerText,
        headerTitleStyle: {
          color: colorConfig.headerText,
        },
        backgroundColor: colorConfig.mainBg,
      }}
    >
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
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorConfig.headerBg,
        },
        headerTintColor: colorConfig.headerText,
        headerTitleStyle: {
          color: colorConfig.headerText,
        }
      }}
    >
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  )
}

const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorConfig.headerBg,
        },
        headerTintColor: colorConfig.headerText,
        headerTitleStyle: {
          color: colorConfig.headerText,
        }
      }}
    >
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  )
}

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorConfig.headerBg,
        },
        headerTintColor: colorConfig.headerText,
        headerTitleStyle: {
          color: colorConfig.headerText,
        }
      }}
    >
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { cart } = useSelector((state) => state.cart);
  const quantity = cart.reduce((quantity, item) => quantity + item.quantity, 0);

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          const color = focused ? colorConfig.tabIconFocused : colorConfig.tabIcon;
          if (route.name === 'CategoriesStack') {
            iconName = focused ? 'home' : 'home-outline'
          }
          else if (route.name === 'CartStack') {
            iconName = focused ? 'cart' : 'cart-outline'
          }
          else if (route.name === 'OrdersStack') {
            iconName = focused ? 'receipt' : 'receipt-outline'
          }
          else {
            iconName = focused ? 'settings' : 'settings-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="CategoriesStack" component={CategoriesStack} />
      <Tab.Screen 
        name="CartStack" 
        component={CartStack} 
        options={{
          tabBarBadge: quantity
        }}
      />
      <Tab.Screen name="OrdersStack" component={OrdersStack} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} />
    </Tab.Navigator>
  )
}

export default AppNavigator;
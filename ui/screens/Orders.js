import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { getAccessToken } from "../redux/authSlice";
import LoginButton from "../components/LoginButton";
import OrdersTab from "./OrdersTab";
import colorConfig from "../configs/colorConfig";

export default function Orders() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data));
  
  if (!accessToken) {
    return (
      <View style={styles.container}>
        <LoginButton />
      </View>
    )
  }

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          color: colorConfig.tabIcon,
        },
      }}
    >
      <Tab.Screen name="To Ship" component={OrdersTab} initialParams={{type: 'toship'}} />
      <Tab.Screen name="Complete" component={OrdersTab} initialParams={{type: 'complete'}} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
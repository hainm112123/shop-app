import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { getAccessToken } from "../redux/authSlice";
import LoginButton from "../components/LoginButton";
import ToShipOrders from "./ToShipOrders";
import CompleteOrders from "./CompleteOrders";

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
    <Tab.Navigator>
      <Tab.Screen name="To Ship" component={ToShipOrders} />
      <Tab.Screen name="Complete" component={CompleteOrders} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
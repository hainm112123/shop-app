import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

import { getAccessToken } from "../redux/authSlice";
import { fetchOrders, setOrders } from "../redux/ordersSlice";
import OrdersItem from "../components/OrdersItem";

export default function OrdersTab({ route }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data));

  const orders = useSelector((state) => state.orders).orders.filter((item) => item.state === route.params.type);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchOrders(accessToken));
    }
    else {
      dispatch(setOrders([]));
    }
  }, [dispatch, accessToken, fetchOrders, setOrders])
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={orders}
        renderItem={({ item }) => <OrdersItem item={item} />}
        keyExtractor={(item) => `${item._id}`}
        style={styles.itemList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemList: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
})
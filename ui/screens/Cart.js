import {  FlatList, StyleSheet, Text, View } from "react-native";
import CartItem from "../components/CartItem";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart, setCart } from "../redux/cartSlice";
import { getAccessToken } from "../redux/authSlice";
import LoginButton from "../components/LoginButton";

export default function Cart() {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((price, item) => price + item.product.price * item.quantity, 0);
  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data)) ;

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCart(accessToken));
    }
    else {
      dispatch(setCart([]));
    }
  }, [dispatch, accessToken]);

  if (!accessToken) {
    return (
      <View style={styles.container}>
        <LoginButton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={cart}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => `${item.product._id}`}
        style={styles.itemList}
      />

      <View style={styles.payContainer}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>Total price</Text>
          <Text style={styles.totalPriceValue}>{totalPrice}K</Text>
        </View>
        <TouchableOpacity style={styles.purchaseBtn} activeOpacity={0.8}>
          <Text style={styles.purchaseBtnText}>Purchase</Text>
        </TouchableOpacity>
      </View>
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
  payContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
  },
  totalPrice: {

  },
  totalPriceText: {
    fontSize: 16,
    color: "#888",
  },
  totalPriceValue: {
    fontSize: 24,
  },
  purchaseBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0081f1",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 4,
  },
  purchaseBtnText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 16,
  }
})
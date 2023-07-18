import {  FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartItem from "../components/CartItem";
import { fetchCart, purchase, setCart } from "../redux/cartSlice";
import { getAccessToken } from "../redux/authSlice";
import LoginButton from "../components/LoginButton";
import colorConfig from "../configs/colorConfig";

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
        keyExtractor={(item) => `${item._id}`}
        style={styles.itemList}
      />

      <View style={styles.payContainer}>
        <View style={styles.totalPrice}>
          <Text style={styles.totalPriceText}>Total price</Text>
          <Text style={styles.totalPriceValue}>{totalPrice}K</Text>
        </View>
        <TouchableOpacity style={styles.purchaseBtn} activeOpacity={0.8} onPress={() => dispatch(purchase(accessToken))}>
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
    backgroundColor: colorConfig.payBg,
    padding: 16,
  },
  totalPrice: {

  },
  totalPriceText: {
    fontSize: 16,
    color: colorConfig.cardSubText,
  },
  totalPriceValue: {
    fontSize: 24,
    color: colorConfig.payPrice,
  },
  purchaseBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorConfig.purchaseBg,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 4,
  },
  purchaseBtnText: {
    color: colorConfig.purchaseText,
    textTransform: "uppercase",
    fontSize: 16,
  }
})
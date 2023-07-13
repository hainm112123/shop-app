import { useContext } from "react";
import {  FlatList, StyleSheet, Text, View } from "react-native";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { TouchableOpacity } from "react-native";

export default function Cart() {
  const { cart } = useContext(CartContext);
  // console.log(cart);
  const totalPrice = cart.reduce((price, item) => price + item.product.price * item.quantity, 0);

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
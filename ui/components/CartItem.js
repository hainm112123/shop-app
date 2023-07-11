import { useContext } from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons'
import { CartContext } from "../contexts/CartContext";

export default function CartItem({ item }) {
  const { product, quantity } = item;
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.img} source={{uri: product.img}} resizeMode="contain"/>
      <View style={styles.info}>
        <Text  numberOfLines={1} style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}K</Text>
      </View>
      <View style={styles.changeQuantity}>
        <Ionicons name="remove-circle-outline" size={24} onPress={() => removeFromCart(product)}/>
        <Text style={styles.quantity}>{quantity}</Text>
        <Ionicons name="add-circle-outline" size={24} onPress={() => addToCart(product)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    shadowOffset: {width: 0, height: 0},
    flexDirection: "row",
  },
  info: {
    padding: 8,
    flex: 2,
  },
  img: {
    flex:1,
    borderTopLeftRadius:4, 
    borderBottomLeftRadius: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#888",
    flex: 1,
  },
  changeQuantity:{
    flex:1,
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 24,
    paddingHorizontal: 8,
  },
})
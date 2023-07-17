import { useContext } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Ionicons from 'react-native-vector-icons/Ionicons'
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { getAccessToken } from "../redux/authSlice";

export default function CartItem({ item }) {
  const { product, quantity } = item;

  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data));

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.img} source={{uri: product.img}} resizeMode="contain"/>
      <View style={styles.info}>
        <Text  numberOfLines={1} style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}K</Text>
      </View>
      <View style={styles.changeQuantity}>
        <Ionicons name="remove-circle-outline" size={24} onPress={() => dispatch(removeFromCart(accessToken, product))}/>
        <Text style={styles.quantity}>{quantity}</Text>
        <Ionicons name="add-circle-outline" size={24} onPress={() => dispatch(addToCart(accessToken, product))} />
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
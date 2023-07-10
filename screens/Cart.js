import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart } = useContext(CartContext);
  // console.log(cart);

  return (
    <FlatList 
      data={cart}
      renderItem={({ item }) => <CartItem item={item} />}
      keyExtractor={(item) => `${item.product.id}`}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 8,
      }}
    />
  )
}
import { View, Image, Text, StyleSheet, ImageBackground, Alert, TouchableOpacity} from "react-native";

export default function ProductListItem({ product, onAddToCartClick }) {
  return (
      <View style={styles.cotainer}> 
        <ImageBackground style={styles.img} source={product.img} resizeMode="contain"/>
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.name} >{product.name}</Text>
          <View style={styles.priceRow}> 
            <Text style={styles.price}>{product.price}</Text>
            <TouchableOpacity onPress={onAddToCartClick}>
              <Text style={styles.cartText} >BUY +</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  cartText: {
    textTransform: "uppercase",
    fontSize: 16,
    color: "#2f95dc",
  },
  cotainer: {
    marginBottom: 20,
    paddingTop: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    shadowOffset: {width: 0, height: 0},
  },
  info: {
    padding: 8
  },
  img: {
    height: 150,
    borderTopLeftRadius:4, 
    borderBottomLeftRadius: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  price: {
    fontSize: 16,
    color: "#888",
    flex: 1,
  }
})
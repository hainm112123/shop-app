import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { getAccessToken } from "../redux/authSlice";
import colorConfig from "../configs/colorConfig";
import { cancel, received } from "../redux/ordersSlice";

export default function OrdersItem({item}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data));

  const { product, quantity, state } = item;
  const price = product.price * quantity;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <ImageBackground style={styles.img} source={{uri: product.img}} resizeMode="contain" />
        <View style={styles.info}>
          <Text  numberOfLines={1} style={styles.name}>{product.name}</Text>
          <Text style={styles.quantity}>x{quantity}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}K</Text>
        </View>
      </View>
      {
        state === 'toship' && <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.receivedBtn} activeOpacity={0.8} onPress={() => dispatch(received(accessToken, item._id))}>
            <Text style={styles.buttonText}>Received</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.8} onPress={() => dispatch(cancel(accessToken, item._id))}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      }
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
    paddingBottom: 4,
    paddingTop: 12,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    marginTop: 12,
    backgroundColor: "#fffefb",
  },
  receivedBtn: {
    marginLeft: 20,
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: colorConfig.primary,
    borderRadius: 4
  },
  cancelBtn: {
    marginLeft: 20,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: "#e9e9e8",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16
  },
  itemContainer: {
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
  priceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },  
  price: {
    fontSize: 16,
    color: "#888",
  },
  quantity: {
    fontSize: 16,
    color: "#888",
  },
})
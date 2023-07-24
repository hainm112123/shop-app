import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductListItem from "../components/ProductListItem";
import { fetchProducts } from "../redux/categorySlice";

export default function Category({ route }) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProducts(route.params._id));
  }, [dispatch, fetchProducts])

  return (
    <FlatList 
      style={styles.container}
      data={products}
      numColumns={2}
      renderItem={({item}) => {
        return (
          <View style={styles.wrapper}>
            <ProductListItem product={item} />
          </View>
        )
      }}
      keyExtractor={(item) => `${item.id}`}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
  }
})
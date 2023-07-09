import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import axios from "axios";

import ProductListItem from "../components/ProductListItem";

export default function Category({ route }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`http://192.168.0.103:3000/products?category=${route.params.id}`);
      setProducts(res.data);
    }
    fetchProducts();
  }, [])

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
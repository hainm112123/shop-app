import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ProductListItem from "../components/ProductListItem";
import ori_1_img from '../assets/Products/Gaming/ori_1.jpg'
import ori_2_img from '../assets/Products/Gaming/ori_2.jpg'

export default function Category({ route }) {
  const { title } = route.params;

  const products = [
    {
      img: ori_1_img,
      name: 'Ori and the blind forest ',
      price: '600k',
    },
    {
      img: ori_2_img,
      name: 'Ori and the will of the wips ',
      price: '600k',
    },
  ]  

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
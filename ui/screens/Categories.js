import { FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryListItem from "../components/CategoryListItem";
import { fetchCategories } from "../redux/categoriesSlice";

export default function Categories({ navigation }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, fetchCategories])

  return (
    <FlatList 
      data={categories}
      renderItem={({item}) => {
        return (
          <CategoryListItem 
            category={item}
            onPress={() => navigation.navigate('Category', item)}
          /> 
        )
      }}
      keyExtractor={(item) => `${item._id}`}
      contentContainerStyle={{
        paddingTop: 16,
        paddingLeft: 16, 
        paddingRight: 16
      }}
    />
  )
}
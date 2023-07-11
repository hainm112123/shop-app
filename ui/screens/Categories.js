import { Alert, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import CategoryListItem from "../components/CategoryListItem";
import GamingImg from '../assets/CategoryListItem/console.png'
import MovieImg from '../assets/CategoryListItem/video.png'
import CodingImg from '../assets/CategoryListItem/coding.png'

const createData = ({id, title, img}) => {
  return {id, title, img}
}

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get('/categories');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const items = await getCategories();
      setCategories([
        createData({...items[0], img: GamingImg}),
        createData({...items[1], img: MovieImg}),
        createData({...items[2], img: CodingImg})
      ])
    }
    fetchCategories();
  }, [])

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
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={{
        paddingTop: 16,
        paddingLeft: 16, 
        paddingRight: 16
      }}
    />
  )
}
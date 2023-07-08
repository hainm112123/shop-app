import { FlatList, ScrollView } from "react-native";

import CategoryListItem from "./CategoryListItem";
import GamingImg from '../assets/CategoryListItem/console.png'
import MovieImg from '../assets/CategoryListItem/video.png'
import CodingImg from '../assets/CategoryListItem/coding.png'

const createData = (id, title, img) => {
  return {id, title, img}
}

export default function CategoryList() {
  const categories = [
    createData(1, 'Gaming', GamingImg),
    createData(2, 'Movie', MovieImg),
    createData(3, 'Coding', CodingImg),
  ]

  return (
    <FlatList 
      data={categories}
      renderItem={({item}) => <CategoryListItem category={item} /> }
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={{
        paddingLeft: 16, 
        paddingRight: 16
      }}
    />
  )
}
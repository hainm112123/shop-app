import { Alert, FlatList, ScrollView } from "react-native";

import CategoryListItem from "../components/CategoryListItem";
import GamingImg from '../assets/CategoryListItem/console.png'
import MovieImg from '../assets/CategoryListItem/video.png'
import CodingImg from '../assets/CategoryListItem/coding.png'

const createData = (id, title, img) => {
  return {id, title, img}
}

export default function Categories({ navigation }) {
  const categories = [
    createData(1, 'Gaming', GamingImg),
    createData(2, 'Movie', MovieImg),
    createData(3, 'Coding', CodingImg),
  ]

  return (
    <FlatList 
      data={categories}
      renderItem={({item}) => {
        return (
          <CategoryListItem 
            category={item}
            onPress={() => navigation.navigate('Category', {
              title: item.title,
            })}
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
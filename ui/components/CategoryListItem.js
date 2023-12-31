import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import colorConfig from "../configs/colorConfig";

export default function CategoryListItem ({ category, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress} 
      activeOpacity={0.5}
      style={styles.container}
    >
      <Text style={styles.title}>{category.title}</Text>
      <Image style={styles.img} source={{uri: category.img}} />
    </TouchableOpacity>
  )
} 
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    backgroundColor: colorConfig.cardBg,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    shadowOffset: {width: 0, height: 0},
    marginBottom: 16,
  },
  img: {
    width: 64,
    height: 64,
    tintColor: colorConfig.cardText,
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700',
    color: colorConfig.categoriesItemText,
  }
})
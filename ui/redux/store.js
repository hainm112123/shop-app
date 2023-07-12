import { combineReducers } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import categoryReducer from "./categorySlice";

const reducer = combineReducers({
  categories: categoriesReducer,
  category: categoryReducer
})

export default configureStore({
  reducer
});
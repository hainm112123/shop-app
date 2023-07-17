import { createSlice } from "@reduxjs/toolkit"
import { SERVER_BASE_URL, CATEGORIES_URL } from '@env'
import axios from "axios";

const initialState = {
  categories: []
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    }
  }
});

export const { setCategories } = categoriesSlice.actions;

export const fetchCategories = () => async (dispatch) => {
  const url = SERVER_BASE_URL + CATEGORIES_URL;
  try {
    const res = await (await fetch(url)).json();  
    dispatch(setCategories(res));
  } catch(err) {
    console.error(err);
  }
}

export default categoriesSlice.reducer;


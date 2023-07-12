import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { SERVER_BASE_URL, PRODUCTS_URL } from '@env'

const initialState = {
  products: []
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    }
  }
})

export const { setProducts } = categorySlice.actions;

export const fetchProducts = (category) => async (dispatch) => {
  const url = SERVER_BASE_URL + PRODUCTS_URL + '?category=' + category;
  const res = await axios.get(url);
  dispatch(setProducts(res.data));
}

export default categorySlice.reducer;
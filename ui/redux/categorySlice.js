import { createSlice } from "@reduxjs/toolkit"
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
  try {
    const res = await fetch(url);
    dispatch(setProducts(await res.json()));  
  } catch(err) {
    console.error(err);
  }
}

export default categorySlice.reducer;
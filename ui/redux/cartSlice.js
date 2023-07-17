import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { CART_URL, ADD_TO_CART_URL, REMOVE_FROM_CART_URL, SERVER_BASE_URL } from "@env"
import { Alert } from "react-native";

const initialState = {
  cart: []
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    }
  }
})

export const { setCart } = cartSlice.actions;

export const fetchCart = (accessToken) => async (dispatch) => {
  try {
    // const res = await axios.get(CART_URL, { 
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   } 
    // });
    // dispatch(setCart(res.data));

    const url = SERVER_BASE_URL + CART_URL;
    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    dispatch(setCart(await res.json()));

    return true;
  } catch(err) {
    Alert.alert(err.response.data);
    return false;
  }
}

export default cartSlice.reducer;
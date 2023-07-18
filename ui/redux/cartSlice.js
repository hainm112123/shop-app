import { createSlice } from "@reduxjs/toolkit"
import { CART_URL, ADD_TO_CART_URL, REMOVE_FROM_CART_URL, SERVER_BASE_URL, PURCHASE_URL } from "@env"
import { Alert } from "react-native";
import { fetchOrders } from "./ordersSlice";

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
    return false;
  }
}

const ADD = 'ADD';
const REMOVE = 'REMOVE'

export const modifyCart = (type, accessToken, product) => async (dispatch) => {
  const url = SERVER_BASE_URL + (type === ADD ? ADD_TO_CART_URL : REMOVE_FROM_CART_URL) + '/' + product._id;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (res.ok) {
    dispatch(fetchCart(accessToken));
    return true;
  }
}

export const addToCart = (accessToken, product) => async (dispatch) => {
  dispatch(modifyCart(ADD, accessToken, product));
}

export const removeFromCart = (accessToken, product) => async (dispatch) => {
  dispatch(modifyCart(REMOVE, accessToken, product));
}

export const purchase = (accessToken) => async (dispatch) => {
  const url = SERVER_BASE_URL + PURCHASE_URL;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  console.log(await res.text());
  if (res.ok) {
    dispatch(fetchCart(accessToken));
    dispatch(fetchOrders(accessToken));
    return true;
  }
}

export default cartSlice.reducer;
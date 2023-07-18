import { createSlice } from "@reduxjs/toolkit"
import { GET_ORDERS_URL, CANCEL_ORDER_URL, RECEIVED_ORDER_URL, SERVER_BASE_URL } from '@env'

const initialState = {
  orders: [],
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload
    }
  }
});

export const { setOrders } = ordersSlice.actions;

export const fetchOrders = (accessToken) => async (dispatch) => {
  const url = SERVER_BASE_URL + GET_ORDERS_URL;
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (res.ok) {
    dispatch(setOrders(await res.json()));
    return true;
  }
  else {
    return false;
  }
}

export const cancel = (accessToken, itemId) => async (dispatch) => {
  const url = SERVER_BASE_URL + CANCEL_ORDER_URL + "/" + itemId;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (res.ok) {
    dispatch(fetchOrders(accessToken));
    return true;
  }
  return res.ok;
}

export const received = (accessToken, itemId) => async (dispatch) => {
  const url = SERVER_BASE_URL + RECEIVED_ORDER_URL + "/" + itemId;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (res.ok) {
    dispatch(fetchOrders(accessToken));
    return true;
  }
  return res.ok;
}

export default ordersSlice.reducer;
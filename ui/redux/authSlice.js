import { createSlice } from "@reduxjs/toolkit"
import { LOGIN_URL, ACCESS_TOKEN_LIFE } from '@env'
import axios from 'axios'
import { Alert } from "react-native"

const initialState = {
  accessToken: null,
  expireDate: null,
  userInfo: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.accessToken = action.payload.accessToken,
      state.expireDate = action.payload.expireDate,
      state.userInfo = action.payload.userInfo
    },
    logout(state, action) {
      state.accessToken = null,
      state.expireDate = null,
      state.userInfo = null
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  const accessTokenLife = ACCESS_TOKEN_LIFE * 60 * 60 * 1000;
  try {
    const res = await axios.post(LOGIN_URL, {
      username, 
      password
    });
    dispatch(loginSuccess({
      accessToken: res.data.accessToken,
      expireDate: JSON.stringify(new Date(Date.now() + accessTokenLife)),
      userInfo: username,
    }));
  } catch(err) {
    Alert.alert(err.response.data);
    return false;
  }

  return true;
}

export const getAccessToken = (data) => (dispatch) => {
  if (!data) return null;
  const { accessToken, expireDate } = data;
  if (!accessToken || !expireDate) return null;
  if (new Date(JSON.parse(expireDate)) < Date.now()) {
    dispatch(logout());
    return null;
  }
  return accessToken;
}

export default authSlice.reducer;
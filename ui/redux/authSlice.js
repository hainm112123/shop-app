import { createSlice } from "@reduxjs/toolkit"
import { LOGIN_URL, ACCESS_TOKEN_LIFE, SERVER_BASE_URL } from '@env'
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
  const url = SERVER_BASE_URL + LOGIN_URL;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, 
        password
      })
    });
    
    if (res.ok) {
      const json = await res.json();
      dispatch(loginSuccess({
        accessToken: json.accessToken,
        expireDate: JSON.stringify(new Date(Date.now() + accessTokenLife)),
        userInfo: username,
      }));
    }
    else {
      Alert.alert(await res.text());
      return false;
    }
  } catch(err) {
    // Alert.alert(err.response.data);
    // console.log(err);
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
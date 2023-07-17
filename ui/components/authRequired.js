import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../redux/authSlice";
import React, { useEffect } from "react";
import { toggleModal } from "../redux/appStateSlice";
import { View } from "react-native";

export default function AuthRequired({ children }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data));

  useEffect(() => {
    if (!accessToken) {
      dispatch(toggleModal(true));
    }
    else {
      dispatch(toggleModal(false));
    }
  })

  return (
    <View>
      { 
        children 
      }
    </View>
  );
}
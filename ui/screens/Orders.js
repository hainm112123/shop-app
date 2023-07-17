import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../redux/authSlice";
import LoginButton from "../components/LoginButton";

export default function Orders() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data));
  
  if (!accessToken) {
    return (
      <View style={styles.container}>
        <LoginButton />
      </View>
    )
  }

  return (
    <Text>Orders</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
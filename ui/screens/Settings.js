import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { toggleModal } from "../redux/appStateSlice";
import colorConfig from "../configs/colorConfig";
import { getAccessToken, logout } from "../redux/authSlice";
import LoginButton from "../components/LoginButton";

export default function Settings() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auth);
  const accessToken = dispatch(getAccessToken(data));
  const { userInfo } = useSelector((state) => state.auth);

  const openModal = () => {
    try {
      dispatch(toggleModal(true));
    } catch(err) {
      console.log(err);
    }
  }

  const onLogoutPress = () => {
    dispatch(logout());
  }

  return (
    <View style={styles.container}>
      {
        accessToken && <View>
          <Text style={styles.header}>Hello, {userInfo}</Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onLogoutPress}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
          </View>
      } 
      {  
        !accessToken && <LoginButton />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  header: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colorConfig.modalBtnBg,
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    width: "50%",
    marginTop: 40,
  },
  btnText: {
    color: "#fff"
  }
})
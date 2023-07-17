import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { toggleModal } from "../redux/appStateSlice";
import colorConfig from "../configs/colorConfig";

export default function LoginButton() {
  const dispatch = useDispatch();

  const openModal = () => {
    try {
      dispatch(toggleModal(true));
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={openModal}>
      <Text style={styles.btnText}>Login</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
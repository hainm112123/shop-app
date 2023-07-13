import { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Modal, ImageBackground, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Iconions from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';

import colorConfig from '../configs/colorConfig';
import sizeConfig from '../configs/sizeConfig';
import brand from '../assets/brand.png'
import { toggleModal } from '../redux/appStateSlice';
import { login } from '../redux/authSlice';

export default function Login() {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const dispatch = useDispatch();
  const { loginModalVisible } = useSelector((state) => (state.appState));

  const onSubmit = () => {
    if (dispatch(login(username, password))) {
      dispatch(toggleModal(false));
      onChangePassword("")
    }
  }

  const onClose = () => {
    dispatch(toggleModal(false));
  }

  return (
    <Modal
      animationType='slide'
      visible={loginModalVisible}
      onRequestClose={() => {
        toggleModal(!loginModalVisible);
      }}
      statusBarTranslucent
    >
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <ImageBackground source={brand} style={styles.brand} resizeMode='contain' />
            <View style={styles.form}>
              <TextInput 
                style={styles.input}
                placeholder='Username'
                placeholderTextColor={colorConfig.placeholderInputText}
                value={username}
                onChangeText={onChangeUsername}
              />
              <TextInput 
                secureTextEntry
                style={styles.input}
                placeholder='Password'
                placeholderTextColor={colorConfig.placeholderInputText}
                value={password}
                onChangeText={onChangePassword}
              />
              <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onSubmit}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.closeBtn} activeOpacity={0.8} onPress={onClose}>
        <Iconions name="close-circle" size={36} color={colorConfig.inputBg}/>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConfig.modalBg
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    height: 100,
    width: "100%",
  },
  form: {
    width: "80%",
  },
  input: {
    backgroundColor: colorConfig.inputBg,
    color: colorConfig.inputText,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: sizeConfig.modalText,
    borderRadius: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: colorConfig.modalBtnBg,
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  closeBtn: {
    position: 'absolute',
    right: 40, top: 40,
  }
})
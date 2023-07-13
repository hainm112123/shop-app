import { Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './AppNavigator'
import { CartProvider } from './contexts/CartContext';
import store from './redux/store';
import { persistor } from './redux/store'
import Login from './modals/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = SERVER_BASE_URL;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <CartProvider>
            <AppNavigator />
          </CartProvider>
        </NavigationContainer>
        <Login />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

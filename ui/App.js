import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';
import { Provider } from 'react-redux';

import AppNavigator from './AppNavigator'
import { CartProvider } from './contexts/CartContext';
import store from './redux/store';

axios.defaults.baseURL = SERVER_BASE_URL;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </NavigationContainer>
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

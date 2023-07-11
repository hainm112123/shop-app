import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';

import AppNavigator from './AppNavigator'
import { CartProvider } from './contexts/CartContext';

axios.defaults.baseURL = SERVER_BASE_URL;
console.log(axios.defaults.baseURL);

export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </NavigationContainer>
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

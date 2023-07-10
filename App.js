import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios'

import AppNavigator from './AppNavigator'
import { CartProvider } from './contexts/CartContext';

axios.defaults.baseURL = "http://192.168.0.103:3000";

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

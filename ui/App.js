import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './AppNavigator'
import store from './redux/store';
import { persistor } from './redux/store'
import Login from './modals/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colorConfig from './configs/colorConfig';

axios.defaults.baseURL = SERVER_BASE_URL;

// async function main() {
//   console.log(await AsyncStorage.getItem("persist:root"));
// }
// main();

export default function App() {
  const navTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colorConfig.mainBg,
      card: colorConfig.headerBg,
      primary: colorConfig.mainBg,
      notification: colorConfig.badgeBg
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        animated={true}
        backgroundColor={colorConfig.headerBg}
        barStyle="light-content"
      />
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <NavigationContainer
            theme={navTheme}
          >
            <AppNavigator />
          </NavigationContainer>
          <Login />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConfig.mainBg,
  },
});

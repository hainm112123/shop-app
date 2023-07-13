import { combineReducers } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import categoriesReducer from "./categoriesSlice";
import categoryReducer from "./categorySlice";
import authReducer from './authSlice';
import appStateReducer from './appStateSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
}

const reducer = combineReducers({
  categories: categoriesReducer,
  category: categoryReducer,
  appState: appStateReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  // reducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
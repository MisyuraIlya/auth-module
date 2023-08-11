import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {  persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { userSlice } from "./user/user.slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
})

const persistConfig = {
  key: 'b2b',
  storage,
  whitelist:['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>

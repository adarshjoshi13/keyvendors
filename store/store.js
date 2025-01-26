import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { authSlice } from "./authSlice";
import { authPartnerSlice } from "./authPartnerSlice";
import { locationSlice } from "./locationSlice";
import { servicesSlice } from "./servicesSlice";
import { combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whiteList: ["cart","auth","location","authPartnerSlice"],
  blacklist: [],
  // timeout: 2000,
};

const rootReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [authSlice.name]:authSlice.reducer,
  [locationSlice.name]:locationSlice.reducer,
  [servicesSlice.name]:servicesSlice.reducer,
  [authPartnerSlice.name]:authPartnerSlice.reducer
  // any other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools:process.env.NODE_ENV==="production"?false:true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export const wrapper = createWrapper(store);

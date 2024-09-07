import { authSlice } from "./reducers/authReducer";
import { cartSlice } from "./reducers/cartReducer";
import { feedSlice } from "./reducers/feedReducer";
import { api } from "./api.js";
import storage from "redux-persist/lib/storage"; //рушій localStorage для персіста
import { configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  persistStore,
  FLUSH, //localStoredReducer, екшони та таке інше
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    [authSlice.name]: persistReducer(
      { key: "auth", storage },
      authSlice.reducer
    ),
    [cartSlice.name]: cartSlice.reducer,
    [feedSlice.name]: feedSlice.reducer,
    [api.reducerPath]: api.reducer, //підключення слайса, створеннного createApi
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    api.middleware,
  ], //додаємо мідлварь
});

const persistor = persistStore(store);

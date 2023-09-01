import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import { racketRivalsApi } from "../services/api";
import auth from "./slice/slice";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [racketRivalsApi.reducerPath]: racketRivalsApi.reducer,
      auth,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(racketRivalsApi.middleware),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import type { ConfigureStoreOptions } from "@reduxjs/toolkit";
import { racketRivalsApi } from "../services/api";
import { listenerMiddleware } from "./middlewares/logout";
import auth from "./slice/auth";
import user from "./slice/user";
import tournaments from "./slice/tournaments";
import modals from "./slice/modals";
import tournamentForm from "./slice/tournamentForm";
import matchForm from "./slice/matchForm";
import matchs from "./slice/matchs";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [racketRivalsApi.reducerPath]: racketRivalsApi.reducer,
      auth,
      user,
      tournaments,
      modals,
      tournamentForm,
      matchForm,
      matchs,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        racketRivalsApi.middleware,
        listenerMiddleware.middleware
      ),
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setUser } from "../slice/user";
import { logout } from "../slice/auth";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setUser(null));

    listenerApi.cancelActiveListeners();
  },
});

import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setUser } from "../slice/user";
import { logout } from "../slice/auth";
import { setMyTournaments } from "../slice/tournaments";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setUser(null));
    listenerApi.dispatch(setMyTournaments(null));

    listenerApi.cancelActiveListeners();
  },
});

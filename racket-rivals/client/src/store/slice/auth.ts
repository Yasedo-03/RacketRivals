import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { userID: null, token: null } as {
  userID: null | any;
  token: null | string;
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setCredentials: (
      state,
      {
        payload: { userID, token },
      }: PayloadAction<{ userID: string; token: string }>
    ) => {
      state.userID = userID;
      state.token = token;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentuserID = (state: RootState) => state.auth.userID;

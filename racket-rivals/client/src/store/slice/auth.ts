import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { userID: null, accessToken: null } as {
  userID: null | any;
  accessToken: null | string;
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setCredentials: (
      state,
      {
        payload: { userID, accessToken },
      }: PayloadAction<{ userID: string; accessToken: string }>
    ) => {
      state.userID = userID;
      state.accessToken = accessToken;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentuserID = (state: RootState) => state.auth.userID;

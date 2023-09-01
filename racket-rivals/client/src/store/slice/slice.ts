import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const slice = createSlice({
  name: "auth",
  initialState: { userID: null, token: null } as {
    userID: null | any;
    token: null | string;
  },
  reducers: {
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

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentuserID = (state: RootState) => state.auth.userID;

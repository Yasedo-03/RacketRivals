import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../services/users/interfaces/usersInterfaces";

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser } = slice.actions;

export default slice.reducer;

export const selectCurrentuser = (state: RootState) => state.user;

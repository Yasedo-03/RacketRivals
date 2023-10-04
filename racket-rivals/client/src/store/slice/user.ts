import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../services/users/interfaces/usersInterfaces";

interface IUserState {
  user: User | null;
  usersList: User[] | null;
  activePage: number;
  totalUsers: number;
}

const initialState: IUserState = {
  user: null,
  usersList: [],
  activePage: 1,
  totalUsers: 0,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUserList: (state, action: PayloadAction<User[] | null>) => {
      state.usersList = action.payload;
    },
    setActivePageUsers: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, setUserList, setActivePageUsers, setTotalUsers } =
  slice.actions;

export default slice.reducer;

export const selectCurrentuser = (state: RootState) => state.user;

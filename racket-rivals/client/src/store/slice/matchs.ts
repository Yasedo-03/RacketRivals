/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Match } from "../../services/tournaments/interfaces/tournamentInterface";

interface IMatchsState {
  matchs: Match[] | null;
}

const initialState: IMatchsState = {
  matchs: null,
};

const slice = createSlice({
  name: "matchs",
  initialState,
  reducers: {
    setMatchs: (state, action: PayloadAction<Match[] | null>) => {
      state.matchs = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setMatchs } = slice.actions;

export default slice.reducer;

/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Match } from "../../services/matchs/interfaces/matchInterface";
import { RootState } from "../store";

interface IMatchsState {
  byId: Record<string, Match>;
  allIds: string[];
}

const initialState: IMatchsState = {
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: "matchs",
  initialState,
  reducers: {
    setMatchs: (state, action: PayloadAction<Match[]>) => {
      state.allIds = action.payload.map((match) => match._id);
      state.byId = action.payload.reduce((accum, match) => {
        accum[match._id] = match;
        return accum;
      }, {} as Record<string, Match>);
    },
  },
  extraReducers: (builder) => {},
});

export const { setMatchs } = slice.actions;
export const selectMatchById = (state: RootState, matchId: string) =>
  state.matchs.byId[matchId];
export const selectAllMatchs = (state: RootState) =>
  state.matchs.allIds.map((id) => state.matchs.byId[id]);

export default slice.reducer;

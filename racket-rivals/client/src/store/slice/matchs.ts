/* eslint-disable @typescript-eslint/no-empty-function */
import { createSelector, createSlice } from "@reduxjs/toolkit";
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
    updateMatches: (state, action: PayloadAction<Match[]>) => {
      action.payload.forEach((match) => {
        if (state.byId[match._id]) {
          state.byId[match._id] = match;
        } else {
          console.error("Match introuvable");
        }
      });
    },
  },
  extraReducers: (builder) => {},
});

export const { setMatchs, updateMatches } = slice.actions;

export const selectMatchById = (state: RootState, matchId: string) =>
  state.matchs.byId[matchId];

export const selectAllMatchs = createSelector(
  (state: RootState) => state.matchs.allIds,
  (state: RootState) => state.matchs.byId,
  (allIds, byId) => allIds.map((id) => byId[id])
);

export default slice.reducer;

/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITournament } from "../../services/tournaments/interfaces/tournamentInterface";

interface ITournamentsState {
  tournaments: ITournament[] | null;
  myTournaments: ITournament[] | null;
  tournament: ITournament | null;
}

const initialState: ITournamentsState = {
  tournaments: null,
  myTournaments: null,
  tournament: null,
};

const slice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments: (state, action: PayloadAction<ITournament[] | null>) => {
      state.tournaments = action.payload;
    },
    setMyTournaments: (state, action: PayloadAction<ITournament[] | null>) => {
      state.myTournaments = action.payload;
    },
    setTournament: (state, action: PayloadAction<ITournament | null>) => {
      state.tournament = action.payload;
    },
    addTournamentToMyTournaments: (
      state,
      action: PayloadAction<ITournament>
    ) => {
      if (state.myTournaments) {
        state.myTournaments.push(action.payload);
      } else {
        state.myTournaments = [action.payload];
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setTournaments,
  setMyTournaments,
  setTournament,
  addTournamentToMyTournaments,
} = slice.actions;

export default slice.reducer;

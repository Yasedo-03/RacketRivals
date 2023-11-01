import { createSlice } from "@reduxjs/toolkit";
import { TournamentListViews } from "../../components/Homepage/TournamentSection/TournamentCard";

type TournamentViewState = {
  currentView: TournamentListViews;
};

const initialState: TournamentViewState = {
  currentView: TournamentListViews?.MyTournaments,
};

const tournamentViewSlice = createSlice({
  name: "tournamentView",
  initialState,
  reducers: {
    setTournamentView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { setTournamentView } = tournamentViewSlice.actions;
export default tournamentViewSlice.reducer;

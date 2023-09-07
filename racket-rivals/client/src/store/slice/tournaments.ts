import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITournament } from "../../services/tournaments/interfaces/tournamentInterface";

interface ITournamentsState {
  tournaments: [ITournament] | null;
  myTournaments: [ITournament] | null;
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
    setTournaments: (state, action: PayloadAction<[ITournament] | null>) => {
      state.tournaments = action.payload;
    },
    setMyTournaments: (state, action: PayloadAction<[ITournament] | null>) => {
      state.myTournaments = action.payload;
    },
    setTournament: (state, action: PayloadAction<ITournament | null>) => {
      state.tournament = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setTournaments, setMyTournaments, setTournament } =
  slice.actions;

export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITournamentInput } from "../../services/tournaments/interfaces/tournamentInterface";
import { format } from "date-fns";

const initialState: ITournamentInput = {
  name: "",
  start_date: format(new Date(), "yyyy-MM-dd"),
  end_date: format(new Date(), "yyyy-MM-dd"),
  start_hour: "",
  location: "",
  format: "Round Robin",
  description: "",
  number_of_participants: 0,
  accesibility: "",
  price: 0,
  contact: {
    email: "",
    phone: "",
  },
};

const slice = createSlice({
  name: "tournamentForm",
  initialState,
  reducers: {
    updateTournamentForm: (
      state,
      action: PayloadAction<Partial<ITournamentInput>>
    ) => {
      return { ...state, ...action.payload };
    },
    clearTournamentForm: () => initialState,
  },
});

export const { updateTournamentForm, clearTournamentForm } = slice.actions;

export default slice.reducer;

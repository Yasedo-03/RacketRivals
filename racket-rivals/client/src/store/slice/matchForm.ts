import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IMatchInput,
  STATUS,
} from "../../services/tournaments/interfaces/tournamentInterface";

type MatchState = Record<string, IMatchInput>;

const initialState: MatchState = {};

const slice = createSlice({
  name: "matchForm",
  initialState,
  reducers: {
    updateMatchForm: (
      state,
      action: PayloadAction<{ matchId: string; data: Partial<IMatchInput> }>
    ) => {
      const { matchId, data } = action.payload;
      if (!state[matchId]) {
        state[matchId] = {
          winner: "",
          score: { player1: 0, player2: 0 },
          status: STATUS.NOT_STARTED,
        };
      }
      state[matchId] = { ...state[matchId], ...data };
    },
    clearMatchForm: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { updateMatchForm, clearMatchForm } = slice.actions;

export default slice.reducer;

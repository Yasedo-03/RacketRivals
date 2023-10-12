import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Match,
  MatchUpdate,
} from "../../services/matchs/interfaces/matchInterface";

type MatchFormState = Record<string, Match>;

const initialState: MatchFormState = {};

const slice = createSlice({
  name: "matchForm",
  initialState,
  reducers: {
    updateMatchForm: (
      state,
      action: PayloadAction<{
        matchId: string;
        data?: MatchUpdate;
        originalMatch?: Match;
      }>
    ) => {
      const { matchId, data, originalMatch } = action.payload;
      if (!state[matchId] && originalMatch) {
        const updatedMatch: Match = {
          ...originalMatch,
          ...data,
          score: {
            player1: data?.score?.player1 || originalMatch.score.player1,
            player2: data?.score?.player2 || originalMatch.score.player2,
          },
        };
        state[matchId] = updatedMatch;
      } else if (state[matchId]) {
        for (const key in data) {
          const value = data[key as keyof MatchUpdate];
          if (value !== undefined) {
            (state[matchId][key as keyof Match] as any) = value;
          }
        }
      }
    },
    setMatchFromAPI: (state, action: PayloadAction<Match>) => {
      const match = action.payload;
      state[match._id] = match;
    },
    clearMatchForm: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { updateMatchForm, clearMatchForm, setMatchFromAPI } =
  slice.actions;

export default slice.reducer;

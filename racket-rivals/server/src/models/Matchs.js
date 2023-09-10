import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "tournaments" },
  round: String,
  player1: { type: Schema.Types.ObjectId, ref: "users", required: true },
  player2: { type: Schema.Types.ObjectId, ref: "users", required: true },
  score: {
    player1: Number,
    player2: Number,
  },
  winner: { type: Schema.Types.ObjectId, ref: "users" },
  nextMatchId: { type: mongoose.Schema.Types.ObjectId, ref: "matchs" },
});

export const MatchModel = mongoose.model("matchs", MatchSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "tournaments" },
  round: { type: String, required: true },
  player1: { type: Schema.Types.ObjectId, ref: "users" },
  player2: { type: Schema.Types.ObjectId, ref: "users" },
  score: {
    player1: Number,
    player2: Number,
  },
  winner: { type: Schema.Types.ObjectId, ref: "users" },
  nextMatchId: { type: mongoose.Schema.Types.ObjectId, ref: "matchs" },
  status: {
    type: String,
    enum: ["NOT_STARTED", "ONGOING", "FINISHED"],
    default: "NOT_STARTED",
  },
});

export const MatchModel = mongoose.model("matchs", MatchSchema);

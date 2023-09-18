import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PoolSchema = new Schema({
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "tournaments",
    required: true,
  },
  name: { type: String, required: true },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  matchs: [
    {
      type: Schema.Types.ObjectId,
      ref: "matchs",
    },
  ],
  participantResults: [
    {
      player: { type: Schema.Types.ObjectId, ref: "users", required: true },
      points: { type: Number, default: 0 },
      scoreDifference: { type: Number, default: 0 },
      matchesPlayed: { type: Number, default: 0 },
    },
  ],
});

export const PoolModel = mongoose.model("pools", PoolSchema);

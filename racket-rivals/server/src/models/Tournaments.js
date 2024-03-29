import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  organizer: { type: Schema.Types.ObjectId, ref: "users", required: true },
  name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  start_hour: { type: String, required: true },
  location: { type: String, required: true },
  format: { type: String, required: true },
  description: { type: String },
  number_of_participants: { type: Number, required: true },
  accesibility: { type: String, required: true },
  contact: {
    email: { type: String, required: true },
    phone: { type: String },
  },
  price: { type: Number, required: true },
  uniqueCode: { type: String, unique: true, required: true },
  status: {
    type: String,
    enum: ["NOT_STARTED", "ONGOING", "FINISHED"],
    default: "NOT_STARTED",
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  seeds: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  matchs: [{ type: mongoose.Schema.Types.ObjectId, ref: "matchs" }],
});

export const TournamentModel = mongoose.model("tournaments", TournamentSchema);

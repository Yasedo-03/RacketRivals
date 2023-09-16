import { TournamentModel } from "../models/Tournaments.js";

export const generateUniqueCode = async () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueCode;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    uniqueCode = "#";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      uniqueCode += chars[randomIndex];
    }

    const existingTournament = await TournamentModel.findOne({ uniqueCode });
    if (!existingTournament) {
      isUnique = true;
    }

    attempts++;
  }

  if (attempts >= maxAttempts) {
    throw new Error("Could not generate a unique code after multiple attempts");
  }

  return uniqueCode;
};

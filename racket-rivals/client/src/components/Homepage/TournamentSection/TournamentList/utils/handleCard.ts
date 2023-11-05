import React from "react";

export const handleCardClick = (
  tournamentId: string,
  setSelectedTournamentId: React.Dispatch<React.SetStateAction<string | null>>,
  isLaptop: boolean,
  selectedTournamentId: string | null
) => {
  if (!isLaptop && !selectedTournamentId) {
    setSelectedTournamentId(tournamentId);
  } else if (!isLaptop && selectedTournamentId) {
    setSelectedTournamentId(null);
  }
};

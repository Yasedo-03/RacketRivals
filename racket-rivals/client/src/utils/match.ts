export const determineWinner = (
  winnerId: string | null,
  player1Id: string | null,
  player2Id: string | null
) => {
  if (winnerId === player1Id) {
    return player1Id;
  } else if (winnerId === player2Id) {
    return player2Id;
  } else {
    return null;
  }
};

export type GameCellValue = "X" | "O" | null;

export type PlayerScore = {
  playerXScore: number;
  playerOScore: number;
  tie: number;
};

export type PlayerName = "X" | "O" | "";

export type WinnerPlayer = {
  hasWon: boolean;
  playerName: PlayerName;
};

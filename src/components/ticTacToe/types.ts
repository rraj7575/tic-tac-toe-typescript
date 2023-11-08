export type GameStateValue = "X" | "O" | null;

export type ScoreType = {
  playerXScore: number;
  playerOScore: number;
  tie: number;
};

export type PlayerName = "X" | "O" | "";

export type WinnerPlayerType = {
  hasWon: boolean;
  playerName: PlayerName;
};

import type { GameStateValue } from "./types";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

export const checkWinner = (
  gameState: GameStateValue[]
): [boolean, GameStateValue] => {
  for (let [a, b, c] of WINNING_COMBINATIONS) {
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return [true, gameState[a]];
    }
  }
  return [false, null];
};

export const checkDraw = (gameState: GameStateValue[]): boolean => {
  for (let a of gameState) {
    if (a === null) {
      return false;
    }
  }
  return true;
};

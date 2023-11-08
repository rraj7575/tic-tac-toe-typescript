import { useEffect, useState } from "react";
import Cell from "./cell/Cell";
import "./index.css";
import { checkDraw, checkWinner } from "./utils";
import type {
  GameStateValue,
  PlayerName,
  ScoreType,
  WinnerPlayerType,
} from "./types";
import { Row } from "./row/Row";

const initialGameState = Array(9).fill(null);

const playerScores: ScoreType = JSON.parse(
  sessionStorage.getItem("player_score") || "{}"
) as ScoreType;

export function TicTacToe() {
  const [gameState, setGameState] =
    useState<GameStateValue[]>(initialGameState);
  const [isXTurn, setTurn] = useState<boolean>(true);
  const [isDraw, setDraw] = useState<boolean>(false);

  const [{ hasWon, playerName }, setWinner] = useState<WinnerPlayerType>({
    hasWon: false,
    playerName: "",
  });

  const [{ playerXScore, playerOScore, tie }, setPlayersScore] = useState({
    playerXScore: playerScores.playerXScore || 0,
    playerOScore: playerScores.playerOScore || 0,
    tie: playerScores.tie || 0,
  });

  useEffect(() => {
    const [isWinner, playerName] = checkWinner(gameState);

    if (isWinner) {
      setWinner({
        hasWon: true,
        playerName: playerName as PlayerName,
      });

      increasePlayerScore(false, playerName);
    } else {
      const isDraw = checkDraw(gameState);

      if (isDraw) {
        setDraw(isDraw);
        increasePlayerScore(true, null);
      }
    }
  }, [gameState]);

  useEffect(() => {
    sessionStorage.setItem(
      "player_score",
      JSON.stringify({
        playerXScore,
        playerOScore,
        tie,
      })
    );
  }, [playerXScore, playerOScore, tie]);

  const increasePlayerScore = (isDraw: boolean, playerName: GameStateValue) => {
    if (isDraw) {
      setPlayersScore((prevState) => {
        return {
          ...prevState,
          tie: prevState.tie + 1,
        };
      });
    } else {
      if (playerName) {
        setPlayersScore((prevState) => {
          return {
            ...prevState,
            [`player${playerName}Score`]:
              prevState[`player${playerName}Score`] + 1,
          };
        });
      }
    }
  };

  const player = isXTurn ? "X" : "O";

  const resetGame = () => {
    setGameState(initialGameState);
    setTurn(true);
    setDraw(false);
    setWinner({
      hasWon: false,
      playerName: "",
    });
  };

  const onClickCell = (index: number) => {
    let newGameState = [...gameState];
    if (newGameState[index] || hasWon || isDraw) {
      return;
    }

    newGameState[index] = player;
    setGameState(newGameState);
    setTurn((prev) => !prev);
  };

  return (
    <div>
      <div className="game-container p-t-5px">
        <Row>
          {[
            { index: 0, className: "b-right-bottom" },
            { index: 1, className: "b-right-bottom" },
            { index: 2, className: "b-bottom" },
          ].map((rowDetails) => {
            const { index, className } = rowDetails;
            return (
              <Cell
                value={gameState[index]}
                classes={className}
                onClickCell={() => onClickCell(index)}
              />
            );
          })}
        </Row>

        <Row>
          {[
            { index: 3, className: "b-right-bottom" },
            { index: 4, className: "b-right-bottom" },
            { index: 5, className: "b-bottom" },
          ].map((rowDetails) => {
            const { index, className } = rowDetails;

            return (
              <Cell
                value={gameState[index]}
                classes={className}
                onClickCell={() => onClickCell(index)}
              />
            );
          })}
        </Row>

        <Row>
          {[
            { index: 6, className: "b-right" },
            { index: 7, className: "b-right" },
            { index: 8, className: "" },
          ].map((rowDetails) => {
            const { index, className } = rowDetails;

            return (
              <Cell
                value={gameState[index]}
                classes={className}
                onClickCell={() => onClickCell(index)}
              />
            );
          })}
        </Row>
      </div>

      <div className="text-center f-size-30 c-white">
        <br />
        <div>
          {!hasWon && !isDraw && <p>Player turn {player}</p>}

          {hasWon && <p>Player {playerName} Won !</p>}

          {isDraw && <p>Match Draw !</p>}

          {(isDraw || hasWon) && (
            <button className="reset-button" onClick={resetGame}>
              Reset
            </button>
          )}
        </div>

        <br />

        <div className="f-size-25 d-flex">
          <div className="d-flex flex-direction-row p-left-right-15px">
            <span>Player (X)</span>
            <span>{playerXScore}</span>
          </div>

          <div className="d-flex flex-direction-row p-left-right-15px">
            <span>Tie</span>
            <span>{tie}</span>
          </div>

          <div className="d-flex flex-direction-row p-left-right-15px">
            <span>Computer (O)</span>
            <span>{playerOScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

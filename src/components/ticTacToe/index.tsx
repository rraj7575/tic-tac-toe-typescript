import { useEffect, useState } from "react";
import "./index.css";
import { checkDraw, checkWinner } from "./utils";
import type {
  GameCellValue,
  PlayerName,
  PlayerScore,
  WinnerPlayer,
} from "./types";
import { Row } from "./row/Row";

const INITIAL_GAME_STATE: GameCellValue[] = Array(9).fill(null);

const PLAYER_SCORE: PlayerScore = JSON.parse(
  sessionStorage.getItem("player_score") || "{}"
) as PlayerScore;

export function TicTacToe() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [isXTurn, setTurn] = useState(true);
  const [isDraw, setDraw] = useState(false);

  const [{ hasWon, playerName }, setWinner] = useState<WinnerPlayer>({
    hasWon: false,
    playerName: "",
  });

  const [{ playerXScore, playerOScore, tie }, setPlayersScore] = useState({
    playerXScore: PLAYER_SCORE.playerXScore || 0,
    playerOScore: PLAYER_SCORE.playerOScore || 0,
    tie: PLAYER_SCORE.tie || 0,
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

  const getCellValue = (cellNo: number) => {
    return gameState[cellNo];
  };

  const increasePlayerScore = (isDraw: boolean, playerName: GameCellValue) => {
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
    setGameState(INITIAL_GAME_STATE);
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
    <>
      <div className="game-container p-t-5px">
        <Row
          rowColums={[
            { index: 0, className: "b-right-bottom" },
            { index: 1, className: "b-right-bottom" },
            { index: 2, className: "b-bottom" },
          ]}
          onClickCell={onClickCell}
          getCellValue={getCellValue}
        />

        <Row
          rowColums={[
            { index: 3, className: "b-right-bottom" },
            { index: 4, className: "b-right-bottom" },
            { index: 5, className: "b-bottom" },
          ]}
          onClickCell={onClickCell}
          getCellValue={getCellValue}
        />

        <Row
          rowColums={[
            { index: 6, className: "b-right" },
            { index: 7, className: "b-right" },
            { index: 8, className: "" },
          ]}
          onClickCell={onClickCell}
          getCellValue={getCellValue}
        />
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
    </>
  );
}

import Cell from "./Cell";
import './ticTacToe.css'
import {useEffect, useState} from "react";
import {checkDraw, checkWinner} from "./../../helper/gameHelper";

export type GameStateValue = 'X' | 'O' | null
type ScoreType = {
    playerXScore: number,
    playerOScore: number,
    tie: number
}

type WinnerPlayerType = {
    hasWon: boolean,
    playerName: 'X' | 'O' | ''
}

const initialGameState = Array(9).fill(null)

const playerScores: ScoreType = JSON.parse(sessionStorage.getItem('player_score') || '{}') as ScoreType

const TicTacToe = () => {

    const [gameState, setGameState] = useState<GameStateValue[]>(initialGameState)
    const [isXTurn, setTurn] = useState<boolean>(true)
    const [isDraw, setDraw] = useState<boolean>(false)

    const [{hasWon, playerName}, setWinner] = useState({
        hasWon: false,
        playerName: ''
    })

    const [{playerXScore, playerOScore, tie}, setPlayersScore] = useState({
        playerXScore: playerScores.playerXScore || 0,
        playerOScore: playerScores.playerOScore || 0,
        tie: playerScores.tie || 0
    })

    useEffect(() => {
        const [isWinner, playerName] = checkWinner(gameState)
        if (isWinner) {
            setWinner({
                hasWon: true,
                playerName
            })
            increasePlayerScore(false, playerName)
        } else {
            const isDraw = checkDraw(gameState)
            if (isDraw) {
                setDraw(isDraw)
                increasePlayerScore(true, null)
            }
        }
    }, [gameState])

    useEffect(() => {
        sessionStorage.setItem('player_score', JSON.stringify({
            playerXScore,
            playerOScore,
            tie
        }))
    }, [playerXScore, playerOScore, tie])

    const increasePlayerScore = (isDraw: boolean, playerName: GameStateValue): void => {
        if (isDraw) {
            setPlayersScore(prevState => {
                return {
                    ...prevState,
                    tie: prevState.tie + 1
                }
            })
        } else {
            if (playerName) {
                setPlayersScore(prevState => {
                    return {
                        ...prevState,
                        [`player${playerName}Score`]: prevState[`player${playerName}Score`] + 1
                    }
                })
            }
        }
    }

    const player = isXTurn ? 'X' : 'O'

    const resetGame = () => {
        setGameState(initialGameState)
        setTurn(true)
        setDraw(false)
        setWinner({
            hasWon: false,
            playerName: ''
        })
    }
    const onClickCell = (index: number) => {
        let newGameState = [...gameState]
        if (newGameState[index] || hasWon || isDraw) {
            return
        }

        newGameState[index] = player
        setGameState(newGameState)
        setTurn(prev => !prev)
    }

    return (
        <div>
            <div className='game-container p-t-5px'>
                <div className='row'>
                    <Cell value={gameState[0]} classes='b-right-bottom' onClickCell={() => onClickCell(0)}/>
                    <Cell value={gameState[1]} classes='b-right-bottom' onClickCell={() => onClickCell(1)}/>
                    <Cell value={gameState[2]} classes='b-bottom' onClickCell={() => onClickCell(2)}/>
                </div>
                <div className='row'>
                    <Cell value={gameState[3]} classes='b-right-bottom' onClickCell={() => onClickCell(3)}/>
                    <Cell value={gameState[4]} classes='b-right-bottom' onClickCell={() => onClickCell(4)}/>
                    <Cell value={gameState[5]} classes='b-bottom' onClickCell={() => onClickCell(5)}/>
                </div>
                <div className='row'>
                    <Cell value={gameState[6]} classes='b-right' onClickCell={() => onClickCell(6)}/>
                    <Cell value={gameState[7]} classes='b-right' onClickCell={() => onClickCell(7)}/>
                    <Cell value={gameState[8]} onClickCell={() => onClickCell(8)}/>
                </div>
            </div>

            <div className='text-center f-size-30 c-white'>
                <br/>
                <div>
                    {!hasWon && !isDraw && <div>Player turn {player}</div>}
                    {hasWon && <div>Player {playerName} Won !</div>}
                    {isDraw && <div>Match Draw !</div>}
                    {(isDraw || hasWon) && <button className='reset-button' onClick={resetGame}>Reset</button>}
                </div>
                <br/>
                <div className='f-size-25 d-flex'>
                    <div className='d-flex flex-direction-row p-left-right-15px'>
                        <span>
                            Player (X)
                        </span>
                        <span>
                            {playerXScore}
                        </span>
                    </div>
                    <div className='d-flex flex-direction-row p-left-right-15px'>
                        <span>
                            Tie
                        </span>
                        <span>
                            {tie}
                        </span>
                    </div>
                    <div className='d-flex flex-direction-row p-left-right-15px'>
                        <span>
                            Computer (O)
                        </span>
                        <span>
                            {playerOScore}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TicTacToe
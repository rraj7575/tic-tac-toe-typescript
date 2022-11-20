
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 4, 28],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
]

const checkWinner = (gameState: any) => {
    for (let [a, b, c] of WINNING_COMBINATIONS){
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a]===gameState[c]){
            return [true, gameState[a]]
        }
    }
    return [false]
}

const checkDraw = (gameState: any): boolean => {
    for (let a of gameState){
        if ( a === null){
            return false
        }
    }
    return true
}

export {
    checkWinner,
    checkDraw
}



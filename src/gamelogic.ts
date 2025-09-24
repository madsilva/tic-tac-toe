export type GameState = {
  board: string[][]
  currentPlayer: '💚' | '🩷'
  winner: '🩷' | '💚' | undefined | 'draw'
}

export const initialGameState: GameState = {
  board: [["", "", ""], ["", "", ""], ["", "", ""]],
  currentPlayer: '🩷', 
  winner: undefined
}

export const makeMove = (gameState: GameState, row: number, col: number) => {
  if (isMoveValid(gameState, row, col)) {
    const newGameState = structuredClone(gameState)
    newGameState.board[row][col] = gameState.currentPlayer
    newGameState.currentPlayer = gameState.currentPlayer === '🩷' ? '💚' : '🩷' 
    if (checkForWin(newGameState)) {
      newGameState.winner = gameState.currentPlayer
    } else if (checkForDraw(newGameState)) {
      newGameState.winner = 'draw'
    }
    return newGameState
  } else {
    return gameState
  }
}

const isMoveValid = (gameState: GameState, row: number, col: number) : boolean => {
  if (gameState.winner) {
    return false
  }
  // There is already a move made in this space
  if (gameState.board[row][col] !== "") {
    return false
  }
  return true
}

const checkForWin = (newGameState: GameState): boolean => {
  const board = newGameState.board
  if (
    // horizontal
    (board[0][0] && board[0][0] === board[0][1] && board[0][1] === board[0][2])
    || (board[1][0] && board[1][0] === board[1][1] && board[1][1] === board[1][2])
    || (board[2][0] && board[2][0] === board[2][1] && board[2][1] === board[2][2])
    // vertical
    || (board[0][0] && board[0][0] === board[1][0] && board[0][0] === board[2][0])
    || (board[0][1] && board[0][1] === board[1][1] && board[0][1] === board[2][1])
    || (board[0][2] && board[0][2] === board[1][2] && board[0][2] === board[2][2])
    // diagonal
    || (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2])
    || (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0])
    )
  {
    return true
  }
  return false
}

const checkForDraw = (newGameState : GameState) : boolean => {
  return false
}
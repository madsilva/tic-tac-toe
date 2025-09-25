import { v4 as uuidv4 } from "uuid"

export type GameState = {
  id: string,
  board: string[][]
  currentPlayer: '💚' | '🩷'
  winner: '🩷' | '💚' | undefined | 'draw'
}

export const createNewGameState = (): GameState => {
  return ({
    id: uuidv4(),
    board: [["", "", ""], ["", "", ""], ["", "", ""]],
    currentPlayer: '🩷', 
    winner: undefined
  })
}

export const initialGameState: GameState = {
  id: '',
  board: [["", "", ""], ["", "", ""], ["", "", ""]],
  currentPlayer: '🩷', 
  winner: undefined
}

export type Move = {
  row: number,
  col: number
}

export const makeMove = (gameState: GameState, move: Move) => {
  if (isMoveValid(gameState, move)) {
    const newGameState = structuredClone(gameState)
    newGameState.board[move.row][move.col] = gameState.currentPlayer
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

const isMoveValid = (gameState: GameState, move: Move) : boolean => {
  if (gameState.winner) {
    return false
  }
  // There is already a move made in this space
  if (gameState.board[move.row][move.col] !== "") {
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
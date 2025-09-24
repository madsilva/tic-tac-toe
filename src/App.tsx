import { useState } from 'react'
import './App.css'
import Grid from './components/Grid'

export type GameState = {
  board: string[][]
  currentPlayer: '💚' | '🩷'
  winner: '🩷' | '💚' | undefined | 'draw'
}

const initialGameState: GameState = {
  board: [["", "", ""], ["", "", ""], ["", "", ""]],
  currentPlayer: '🩷', 
  winner: undefined
}

function App() {
  const [gameState, setGameState] = useState(initialGameState)

  const makeMove = (row: number, col: number) => {
    if (checkMove(row, col)) {
      const newGameState = structuredClone(gameState)
      newGameState.board[row][col] = gameState.currentPlayer
      newGameState.currentPlayer = gameState.currentPlayer === '🩷' ? '💚' : '🩷' 
      if (checkForWin(newGameState)) {
        newGameState.winner = gameState.currentPlayer
      } else if (checkForDraw(newGameState)) {
        newGameState.winner = 'draw'
      }
      setGameState(newGameState)
    }
  }

  const checkMove = (row: number, col: number) : boolean => {
    if (gameState.winner) {
      return false
    }
    if (gameState.board[row][col] !== "") {
      return false
    }
    return true
  }

  const checkForDraw = (newGameState : GameState) : boolean => {
    return false
  }

  const resetGame = () => {
    const newGameState = structuredClone(initialGameState)
    setGameState(newGameState)
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

  return (
    <>
      <div>
        <p>current player is {gameState.currentPlayer}</p>
        {gameState.winner ? (<>the winner is {gameState.winner}</>) : ("")}
        <Grid gameState={gameState} makeMove={makeMove} />
        <button onClick={resetGame}>reset game!</button>
        </div>
    </>
  )
}

export default App

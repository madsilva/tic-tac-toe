import { useState } from 'react'
import './App.css'
import Grid from './components/Grid'

export type GameState = {
  board: string[][]
  currentPlayer: 'o' | 'x'
  winner: 'o' | 'x' | undefined
}

const initialGameState: GameState = {
  board: [["", "", ""], ["", "", ""], ["", "", ""]],
  currentPlayer: 'x', 
  winner: undefined
}

const currentPlayerDisplay = () => {
  return (
    <></>
  )
}

function App() {
  const [gameState, setGameState] = useState(initialGameState)
  const [count, setCount] = useState(0)

  const makeMove = (row: number, col: number) => {
    const newGameState = structuredClone(gameState)
    newGameState.board[row][col] = gameState.currentPlayer
    newGameState.currentPlayer = gameState.currentPlayer === 'x' ? 'o' : 'x' 
    if (checkForWin(newGameState)) {
      resetGame()
    } else {

    }
    setGameState(newGameState)
  }

  const resetGame = () => {
    
  }

  const checkForWin = (newGameState: GameState): boolean => {
    const board = newGameState.board
    console.log(board[0][0] === board[0][1])
    console.log(board[0][0] && board[0][0] === board[0][1] && board[0][1] === board[0][2])
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
      || (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2])
      )
    {
      alert("wowwwww")
      return true
    }
    return false
  }

  return (
    <>
      <div>
        <p>current player is {gameState.currentPlayer}</p>
        <Grid gameState={gameState} makeMove={makeMove} />
        </div>
    </>
  )
}

export default App

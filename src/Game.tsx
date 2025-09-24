import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type GameState, type Move, initialGameState } from './gamelogic'
import { makeMove as getNewGameState } from './gamelogic'

const Game = () => {
  const queryClient = useQueryClient()

  const getGame = async () => {
    const result = await fetch('/game')
    return await result.json()
  }

  useEffect( () => {
    const fetchGame = async () => {
      const newGame = await getGame()
      setGameState(newGame)
    }
    fetchGame()
  }, [])

  const makeMove = async (move: Move) => {
    const res = await fetch('/makeMove', {method: 'POST', body: JSON.stringify(move),  headers: { 'Content-Type': 'application/json' } })
    const newGame = await res.json()
    setGameState(newGame)
  }

  const sendMove = useMutation({
    mutationFn: makeMove,
    onSuccess: (newGameBoard) => {
      console.log('success')
    }
  })

  const [gameState, setGameState] = useState(initialGameState)

  const resetGame = async () => {
    const newGameState = structuredClone(initialGameState)
    setGameState(newGameState)
    const res = await fetch('/resetGame', {method: 'POST', body: '',  headers: { 'Content-Type': 'application/json' } })
    
  }

  return (
    <div>
      <p>Current player is {gameState.currentPlayer}</p>
      {gameState.winner ? (<>the winner is {gameState.winner}</>) : ("")}
      <div className="text-xl text-purple-600">
        <p>
          <Cell makeMove={makeMove} gameState={gameState} row={0} col={0}/>
          <Cell makeMove={makeMove} gameState={gameState} row={0} col={1}/>
          <Cell makeMove={makeMove} gameState={gameState} row={0} col={2}/>
        </p>
        <p>
          <Cell makeMove={makeMove} gameState={gameState} row={1} col={0}/>
          <Cell makeMove={makeMove} gameState={gameState} row={1} col={1}/>
          <Cell makeMove={makeMove} gameState={gameState} row={1} col={2}/>
        </p>
        <p>
          <Cell makeMove={makeMove} gameState={gameState} row={2} col={0}/>
          <Cell makeMove={makeMove} gameState={gameState} row={2} col={1}/>
          <Cell makeMove={makeMove} gameState={gameState} row={2} col={2}/>
        </p>
      </div>
      <button onClick={resetGame}>reset game!</button>
    </div>
  )
}

interface CellProps {
    makeMove: (move: Move) => void,
    row: number,
    col: number,
    gameState: GameState
}

const Cell = ({ makeMove, row, col, gameState }: CellProps) => {
  const handleClick = () => {
    makeMove({ row: row, col: col })
  }

  return (
    <button onClick={handleClick}>
      {gameState.board[row][col]}
    </button>
  )
}

export default Game

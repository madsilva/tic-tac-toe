import { useState, useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { type GameState, type Move, initialGameState } from './gamelogic'
import { useParams, Link } from "react-router"

const Game = () => {
  const { gameId } = useParams()
  const queryClient = useQueryClient()

  const getGame = async (gameId) => {
    const result = await fetch(`/get_game/${gameId}`)
    return await result.json()
  }

  const { isPending, error, data } = useQuery({queryKey: ['gameState', gameId], queryFn: () => getGame(gameId)})
  const gameState = data as GameState

  const sendMove = async ({ gameId, move }) => {
    const res = await fetch(`/make_move/${gameId}`, {method: 'POST', body: JSON.stringify(move),  headers: { 'Content-Type': 'application/json' } })
    return await res.json()
  }

  const makeMove = async (gameId: string, move: Move) => {
    moveMutation.mutate({gameId, move})
  }

  const moveMutation = useMutation({
    mutationFn: sendMove,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['gameState', data.gameId])
    }
  })

  const resetGame = async (gameId) => {
    const res = await fetch(`/resetGame/${gameId}`, {method: 'POST', body: '',  headers: { 'Content-Type': 'application/json' } })
    return await res.json()
  }

  const resetGameMutation = useMutation({
    mutationFn: resetGame,
    onSuccess:(data) => {
      queryClient.invalidateQueries(['gameState', data.gameId])
    }
  })

  if (isPending) {
    return <div>loading</div>
  } else return (
    <div>
      <Link to='/'><button className='absolute top-4 left-4'>Back to games</button></Link>
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
      <button onClick={() => resetGameMutation.mutate(gameState.id)}>reset game!</button>
    </div>
  )
}

interface CellProps {
    makeMove: (id: string, move: Move) => void,
    row: number,
    col: number,
    gameState: GameState
}

const Cell = ({ makeMove, row, col, gameState }: CellProps) => {
  const handleClick = () => {
    makeMove(gameState.id, { row: row, col: col })
  }

  return (
    <button onClick={handleClick}>
      {gameState.board[row][col]}
    </button>
  )
}

export default Game

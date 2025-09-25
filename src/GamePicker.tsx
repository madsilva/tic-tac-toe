import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { type GameState } from './gamelogic'
import { Link } from 'react-router';

export const GamePicker = () => {
  const queryClient = useQueryClient()

  const getGames = async () => {
    const result = await fetch('/list', { method: 'GET' })
    const json_result = await result.json()
    console.log("getGames result", json_result)
    return json_result
  }

  const { isPending, error, data } = useQuery({queryKey: ['games'], queryFn: getGames})
  console.log("this is the data", data)
  
  const handleNewGame = async () => {
    const res = await fetch('/create', {method: 'POST', headers: { 'Content-Type': 'application/json' } })
  }
  
  console.log('data as list?', Object.entries(data))
  if (isPending) {
    return <p>loading....</p>
  } else {
      return (
          
          <>
            {Object.entries(data).map(([id, game]) => <div><Link to={`/game/${game.id}`}>{game.id}</Link></div>)}
            <button onClick={handleNewGame}>new game!!!!</button>
          </>
        )
  }
  
}
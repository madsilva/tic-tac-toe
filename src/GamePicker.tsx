import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { type GameState } from './gamelogic'
import { Link } from 'react-router';

export const GamePicker = () => {
  const queryClient = useQueryClient()

  const getGames = async () => {
    const result = await fetch('/list', { method: 'GET' })
    console.log("result in picker", result)
    return await result.json()
  }

  const { isPending, error, data } = useQuery({queryKey: ['games'], queryFn: getGames})

  const handleNewGame = async () => {
    const res = await fetch('/create', {method: 'POST', headers: { 'Content-Type': 'application/json' } })
    return await res.json()
  }

  const newGameMutation = useMutation({
    mutationFn: handleNewGame,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['games'], refetchType: 'active'})
    }
  })

  if (isPending) {
    return <p>loading....</p>
  } else {
      return (
        <>
          {Object.entries(data).map(([id, game]) => <div key={game.id}><Link to={`/game/${game.id}`}>{game.id}</Link></div>)}
          <button onClick={() => newGameMutation.mutate()}>new game!!!!</button>
        </>
      )
  }
}
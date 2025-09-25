import { useState, useEffect } from 'react'

export const GamePicker = () => {
  const [games, setGames] = useState({})

  useEffect( () => {
    const fetchGames = async () => {
      const res  = await fetch('/list', {method: 'GET'})
      const data = await res.json()
      console.log(data)
    }
    fetchGames()
  }, [])
  
  const handleNewGame = async () => {
    const res = await fetch('/create', {method: 'POST', headers: { 'Content-Type': 'application/json' } })
  }
  
  return (
    <>
      <button onClick={handleNewGame}>new game!!!!</button>
    </>
  )
}
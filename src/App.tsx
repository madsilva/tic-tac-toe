import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from "react-router"
import './App.css'
import Game from './Game'
import { GamePicker } from './GamePicker'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GamePicker />} />
          <Route path='/game/:gameId' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

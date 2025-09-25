import express from "express";
import ViteExpress from "vite-express";
import { type GameState, type Move, createNewGameState, makeMove } from './src/gamelogic'

const app = express();
app.use(express.json())

let game = createNewGameState()
let games = new Map<string, GameState>()

app.get("/list", (req, res) => {
  res.json(Object.fromEntries(games))
})

app.post("/create", (req, res) => {
  const newGame = createNewGameState()
  games.set(newGame.id, newGame)
  
})

app.post("/make_move/:id", (req, res) => {
  const move = req.body as Move
  console.log("move from server", move)
  const currentGame = games.get(req.params.id)
  console.log("current game from server", currentGame)
  const newBoard = makeMove(currentGame, move)
  games.set(req.params.id, newBoard)
  res.json(newBoard)
})

app.post("/resetGame", (req, res) => {
  game = initialGameState
})

app.get("/get_game/:id", (req, res) => {
  console.log("server says get game called ", req.params.id)
  console.log("server says get game is this", games.get(req.params.id))
  res.json(games.get(req.params.id))
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

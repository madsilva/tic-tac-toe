//e.g server.js
import express from "express";
import ViteExpress from "vite-express";
import { type GameState, type Move, initialGameState, makeMove } from './src/gamelogic'

const app = express();
app.use(express.json())

let game = initialGameState

app.get("/game", (_req, res) => {
  res.json(game)
})

app.post("/makeMove", (req, res) => {
  const move = req.body as Move
  const newBoard = makeMove(game, move)
  game = newBoard
  res.json(game)
})

app.post("/resetGame", (req, res) => {
  game = initialGameState
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
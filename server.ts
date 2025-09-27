import express from "express";
import ViteExpress from "vite-express";
import { db } from './src/index'
import { gamesTable } from './src/db/schema'
import { eq } from "drizzle-orm";
import 'dotenv/config';
import { type GameState, type Move, createNewGameState, makeMove } from './src/gamelogic'

const app = express();
app.use(express.json())

let game = createNewGameState()
let games = new Map<string, GameState>()

app.get("/list", async (req, res) => {
  const allGames = await db.select().from(gamesTable);
  console.log('fetch done')
  res.json(allGames)
  return allGames
})

app.post("/create", async (req, res) => {
  await db.insert(gamesTable).values(createNewGameState())
  const newGame = createNewGameState()
  games.set(newGame.id, newGame)
  res.json({ success: true }) 
})

app.post("/make_move/:id", async (req, res) => {
  const move = req.body as Move
  const currentGame = await db.select().from(gamesTable).where(eq(gamesTable.id, req.params.id))
  const currentGameReal = currentGame[0] as GameState
  const newBoard = makeMove(currentGameReal, move)
  const values: typeof gamesTable.$inferInsert = newBoard
  const dbRes = await db.update(gamesTable).set(values).where(eq(gamesTable.id, req.params.id))
  res.json(newBoard)
})

app.post("/resetGame", (req, res) => {
  game = initialGameState
})

app.get("/get_game/:id", async (req, res) => {
  const game = await db.select().from(gamesTable).where(eq(gamesTable.id, req.params.id));
  console.log("game from db", game)
  res.json(game[0])
  //res.json(games.get(req.params.id))
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

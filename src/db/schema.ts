import { integer, pgTable, varchar, jsonb } from "drizzle-orm/pg-core";

export const gamesTable = pgTable("games", {
  id: varchar({ length: 255 }).primaryKey(),
  winner: varchar("winner", { length: 255 }),
  currentPlayer: varchar({ length: 255} ),
  board: jsonb('board')
})

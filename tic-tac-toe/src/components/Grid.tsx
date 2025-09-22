import type { GameState } from '../App'

interface GridProps {
    gameState: GameState, 
    makeMove: (row: number, col: number) => void
}

const Grid = ({ gameState, makeMove }: GridProps) => {
    return (
        <div className="text-xl text-purple-600">
            <p><Cell makeMove={makeMove} gameState={gameState} row={0} col={0}/>
            <Cell makeMove={makeMove} gameState={gameState} row={0} col={1}/>
            <Cell makeMove={makeMove} gameState={gameState} row={0} col={2}/>
            </p>
            <p>
                <Cell makeMove={makeMove} gameState={gameState} row={1} col={0}/>
                <Cell makeMove={makeMove} gameState={gameState} row={1} col={1}/>
                <Cell makeMove={makeMove} gameState={gameState} row={1} col={2}/>
            </p>
            <p><Cell makeMove={makeMove} gameState={gameState} row={2} col={0}/>
                <Cell makeMove={makeMove} gameState={gameState} row={2} col={1}/>
                <Cell makeMove={makeMove} gameState={gameState} row={2} col={2}/></p>
        </div>
    )
}

interface CellProps {
    makeMove: (row: number, col: number) => void,
    row: number,
    col: number,
    gameState: GameState
}

const Cell = ({ makeMove, row, col, gameState }: CellProps) => {
    const handleClick = () => {
        makeMove(row, col)
    }

    return (
        <>
        <button onClick={handleClick}>
            {gameState.board[row][col]}
        </button>
        </>
    )
}

export default Grid
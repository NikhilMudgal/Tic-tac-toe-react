import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard ({ onSelectSquare }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updateBoard[rowIndex][colIndex] = 'X';
            return updateBoard;
        });
        onSelectSquare(); // active player will be changed after the previous has filled the box
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key = {rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key = {colIndex}>
                                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
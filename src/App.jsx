import Player from "./components/Player"
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "../winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // we are adding active player check because both Player and Gameboard should know which player is currently active
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];
    for(const turn of gameTurns) {
        const {square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    let winner = null;
    const hasDraw = gameTurns.length === 9 && !winner;

    for(const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && 
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol) {
          winner = firstSquareSymbol
      }

    }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    
    // const activePlayer = deriveActivePlayer(gameTurns);

    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns ];

      return updatedTurns;
    })
  }

  function reMatch() {
    setGameTurns([]);
    winner = null;
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          {/* both these instances work indpendently */}
          <Player initialName="Player 1" symbol ="X" isActive ={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive ={activePlayer === 'O'} />

        </ol>
        {(winner || hasDraw) && <GameOver hasDraw = {hasDraw} winner = { winner }  onRestart={reMatch}/>}
      <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol={activePlayer} board= {gameBoard}/>    
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

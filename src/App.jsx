import Player from "./components/Player"
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "../winning-combinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAMEBOARD = [
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

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAMEBOARD.map(array => [...array])];
  for(const turn of gameTurns) {
    const {square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([])
  // we are adding active player check because both Player and Gameboard should know which player is currently active
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner; 

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
  }

  function onPlayerNameChange(Symbol, newName) {
    setPlayers(prePlayers => {
      return {
        ...prePlayers,
        [Symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          {/* both these instances work indpendently */}
          <Player initialName={PLAYERS['X']} symbol ="X" isActive ={activePlayer === 'X'} onSave = {onPlayerNameChange} />
          <Player initialName={PLAYERS['O']} symbol="O" isActive ={activePlayer === 'O'} onSave = {onPlayerNameChange} />

        </ol>
        {(winner || hasDraw) && <GameOver hasDraw = {hasDraw} winner = { winner }  onRestart={reMatch}/>}
      <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol={activePlayer} board= {gameBoard}/>    
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

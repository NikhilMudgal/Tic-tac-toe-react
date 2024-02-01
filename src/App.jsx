import Player from "./components/Player"
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

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

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          {/* both these instances work indpendently */}
          <Player initialName="Player 1" symbol ="X" isActive ={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive ={activePlayer === 'O'} />

        </ol>
      <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol={activePlayer} turns= {gameTurns}/>    
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

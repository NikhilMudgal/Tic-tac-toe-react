import Player from "./components/Player"
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // we are adding active player check because both Player and Gameboard should know which player is currently active
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      let currentPlayer = 'X';
      if(prevTurns?.length && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
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
      <Log />
    </main>
  )
}

export default App

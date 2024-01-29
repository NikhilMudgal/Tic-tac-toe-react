import Player from "./components/Player"
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {

  // we are adding active player check because both Player and Gameboard should know which player is currently active
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          {/* both these instances work indpendently */}
          <Player initialName="Player 1" symbol ="X" isActive ={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive ={activePlayer === 'O'} />

        </ol>
      <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol={activePlayer}/>    
      </div>

      LOG
    </main>
  )
}

export default App

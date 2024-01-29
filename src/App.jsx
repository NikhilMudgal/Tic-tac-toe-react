import Player from "./components/Player"
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {

  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players">
          {/* both these instances work indpendently */}
          <Player initialName="Player 1" symbol ="X" />
          <Player initialName="Player 2" symbol="O"/>

        </ol>
      <GameBoard />    
      </div>

      LOG
    </main>
  )
}

export default App

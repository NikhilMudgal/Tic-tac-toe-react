import { useState } from "react";

export default function Player({initialName, symbol}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [ isEditing, setIsEditing ]  = useState(false);

    function editPlayerName() {
        // setIsEditing(!isEditing); // never change state like this. this is not a best practice because state updats are not performed instantly but at some point in the future whenever react has time for it
        setIsEditing((editing) => !editing); // this function will be automatically called by react and will receive the guaranteed latest state value
    }

    function handleChange(event) { // onchange will pass the $event parameter in handleChange() whenever onChange is triggered
        console.log(event)
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing) {
        editablePlayerName = <input type="text" required value = {playerName} onChange={handleChange} />
    }
    return (
        <li>
            <span className="player">
            { editablePlayerName }
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={ editPlayerName}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}
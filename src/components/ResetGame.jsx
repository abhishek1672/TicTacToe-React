import React from 'react'
import GameState from './GameState'

const ResetGame = ({ gameState, onReset }) => {



    if (gameState === GameState.inProgress) {
        return;
    }




    return (
        <div onClick={onReset} className='reset-button'>Reset</div>
    )


}

export default ResetGame
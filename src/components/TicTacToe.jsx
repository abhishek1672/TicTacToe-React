import React, { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import ResetGame from "./ResetGame";

const PLAYER_X = "X";
const PLAYER_O = "O";


const winningCombinations = [

    //Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    // Columns
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },

    // Diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },


];

const checkWinner = (tiles, setStrikeClass, setGameState) => {



    for (const { combo, strikeClass } of winningCombinations) {
        const tilevalue1 = tiles[combo[0]];
        const tilevalue2 = tiles[combo[1]];
        const tilevalue3 = tiles[combo[2]];

        if (tilevalue1 !== null && tilevalue1 === tilevalue2 && tilevalue1 === tilevalue3) {
            setStrikeClass(strikeClass);

            if (tilevalue1 === PLAYER_X) {
                setGameState(GameState.playerXWins)
            }
            else {
                setGameState(GameState.playerOWins)
            }
            return;
        }
    }

    const isEveryTileFilledIn = tiles.every((tile) => tile !== null);

    if (isEveryTileFilledIn) {
        setGameState(GameState.draw);
    };

}


const TicTacToe = () => {

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);

    const handleTileClick = (index) => {

        if (gameState !== GameState.inProgress) {
            return;
        }


        if (tiles[index] !== null) {
            return;
        };



        const newTile = [...tiles]
        newTile[index] = playerTurn;
        setTiles(newTile);
        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O)
        }
        else {
            setPlayerTurn(PLAYER_X)
        }
    }

    const handleReset = () => {

        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }



    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);


    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass} />

            <GameOver gameState={gameState} />
            <ResetGame gameState={gameState} onReset={handleReset} />
        </div>

    )
}

export default TicTacToe;
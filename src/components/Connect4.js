import React, { useState } from 'react';
import './css/Connect4.css'; // Import du fichier CSS pour styliser la grille et les boutons

const Connect4 = () => {
    const [squares, setSquares] = useState(Array(42).fill(null));
    const [turn, setTurn] = useState('Rouge');
    const [winner, setWinner] = useState(null);

    // Fonction pour vérifier s'il y a un gagnant
    const checkWinner = (newSquares) => {
        const numRows = 6;
        const numCols = 7;

        const checkLine = (a, b, c, d) => {
            return a !== null && a === b && a === c && a === d;
        };

        // Vérification horizontale
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols - 3; col++) {
                const index = row * numCols + col;
                if (checkLine(newSquares[index], newSquares[index + 1], newSquares[index + 2], newSquares[index + 3])) {
                    setWinner(newSquares[index]);
                    return;
                }
            }
        }

        // Vérification verticale
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows - 3; row++) {
                const index = row * numCols + col;
                if (checkLine(newSquares[index], newSquares[index + numCols], newSquares[index + 2 * numCols], newSquares[index + 3 * numCols])) {
                    setWinner(newSquares[index]);
                    return;
                }
            }
        }

        // Vérification diagonale montante
        for (let row = 0; row < numRows - 3; row++) {
            for (let col = 0; col < numCols - 3; col++) {
                const index = row * numCols + col;
                if (checkLine(newSquares[index], newSquares[index + numCols + 1], newSquares[index + 2 * (numCols + 1)], newSquares[index + 3 * (numCols + 1)])) {
                    setWinner(newSquares[index]);
                    return;
                }
            }
        }

        // Vérification diagonale descendante
        for (let row = 3; row < numRows; row++) {
            for (let col = 0; col < numCols - 3; col++) {
                const index = row * numCols + col;
                if (checkLine(newSquares[index], newSquares[index - numCols + 1], newSquares[index - 2 * (numCols - 1)], newSquares[index - 3 * (numCols - 1)])) {
                    setWinner(newSquares[index]);
                    return;
                }
            }
        }
    };

    // Fonction appelée lorsqu'un joueur clique sur une case
    const handleClick = (index) => {
        if (winner) return; // Arrête le jeu si un gagnant est trouvé

        const modIndex = index % 7;

        for (let row = 5; row >= 0; row--) {
            const i = row * 7 + modIndex;
            if (!squares[i]) {
                const newSquares = squares.slice();
                newSquares[i] = turn;

                setSquares(newSquares);
                checkWinner(newSquares);

                setTurn(turn === 'Rouge' ? 'Jaune' : 'Rouge');
                break;
            }
        }
    };

    // Réinitialiser le jeu
    const resetGame = () => {
        setSquares(Array(42).fill(null));
        setTurn('Rouge');
        setWinner(null);
    };

    return (
        <div className="connect4">
            <h1>Jeu du puissance 4</h1>
            {winner ? <h2>Le gagnant est : {winner} !</h2> : <h2>Tour actuel : {turn}</h2>}

            <div className="gridConnect4">
                {squares.map((square, index) => (
                    <div
                        key={index}
                        className={`squareConnect4 ${square === 'Rouge' ? 'red' : square === 'Jaune' ? 'yellow' : ''}`}
                        onClick={() => handleClick(index)}
                    >
                    </div>
                ))}
            </div>

            <button className="reset-button" onClick={resetGame}>
                Réinitialiser le jeu
            </button>
        </div>
    );
};

export default Connect4;

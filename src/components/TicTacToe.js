import React, { useState } from 'react';
import './css/TicTacToe.css'; // Import du fichier CSS pour styliser la grille et les boutons

const TicTacToe = () => {
    // État pour la grille 3x3, initialisée avec des cases vides (null)
    const [squares, setSquares] = useState(Array(9).fill(null));

    // État pour le tour du joueur (commence par 'X')
    const [turn, setTurn] = useState('X');

    // État pour garder la trace du gagnant
    const [winner, setWinner] = useState(null);

    // Fonction pour vérifier s'il y a un gagnant après chaque mouvement
    const checkWinner = (newSquares) => {
        // Combinaisons gagnantes possibles sur une grille 3x3
        const winningCombos = [
            [0, 1, 2], // Ligne du haut
            [3, 4, 5], // Ligne du milieu
            [6, 7, 8], // Ligne du bas
            [0, 3, 6], // Colonne de gauche
            [1, 4, 7], // Colonne du milieu
            [2, 5, 8], // Colonne de droite
            [0, 4, 8], // Diagonale de haut gauche à bas droite
            [2, 4, 6], // Diagonale de haut droite à bas gauche
        ];

        // Boucle sur chaque combinaison gagnante possible
        for (let combo of winningCombos) {
            const [a, b, c] = combo; // Indices des cases dans une combinaison
            // Si les trois cases dans une combinaison ont la même valeur ('X' ou 'O') et ne sont pas nulles
            if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
                setWinner(newSquares[a]); // On déclare le gagnant
                return; // Sort de la fonction
            }
        }
    };

    // Fonction appelée lorsqu'un joueur clique sur une case
    const handleClick = (index) => {
        // Si la case est déjà remplie ou si le jeu est terminé (il y a un gagnant), on ne fait rien
        if (squares[index] || winner) return;

        // Crée une copie du tableau des cases pour ne pas modifier directement l'état
        const newSquares = squares.slice();

        // Remplit la case cliquée avec le symbole du joueur actuel ('X' ou 'O')
        newSquares[index] = turn;

        // Met à jour la grille avec le nouveau tableau des cases
        setSquares(newSquares);

        // Vérifie s'il y a un gagnant après ce mouvement
        checkWinner(newSquares);

        // Change de joueur pour le prochain tour ('X' devient 'O' et inversement)
        setTurn(turn === 'X' ? 'O' : 'X');
    };

    // Fonction pour réinitialiser le jeu, vide toutes les cases et réinitialise l'état
    const resetGame = () => {
        setSquares(Array(9).fill(null)); // Remet la grille à vide
        setTurn('X'); // Le joueur 'X' commence toujours
        setWinner(null); // Pas de gagnant au début
    };

    return (
        <div className="tictactoe">
            <h1>Jeu de Tic Tac Toe</h1>

            {/* Affiche le gagnant ou le joueur dont c'est le tour */}
            {winner ? <h2>Le gagnant est : {winner}</h2> : <h2>Tour actuel : {turn}</h2>}

            {/* Grille de jeu : 9 cases cliquables */}
            <div className="gridTictactoe">
                {squares.map((square, index) => (
                    <div key={index} className="square" onClick={() => handleClick(index)}>
                        {square} {/* Affiche 'X' ou 'O' dans la case */}
                    </div>
                ))}
            </div>

            {/* Bouton pour réinitialiser le jeu */}
            <button className="reset-button" onClick={resetGame}>
                Réinitialiser le jeu
            </button>
        </div>
    );
};

export default TicTacToe;

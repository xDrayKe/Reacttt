import React, { useState } from 'react';
import './css/Sudoku.css';

// Fonction pour créer une grille vide
const emptyGrid = () => Array(9).fill(null).map(() => Array(9).fill(''));

// Génération de la grille avec quelques chiffres pour l'exemple
const generateSudoku = () => {
    const grid = emptyGrid();
    grid[0][0] = '5'; grid[0][1] = '3'; grid[0][4] = '7';
    grid[1][0] = '6'; grid[1][3] = '1'; grid[1][4] = '9'; grid[1][5] = '5';
    grid[2][1] = '9'; grid[2][2] = '8'; grid[2][7] = '6';
    grid[3][0] = '8'; grid[3][4] = '6'; grid[3][8] = '3';
    grid[4][0] = '4'; grid[4][3] = '8'; grid[4][5] = '3'; grid[4][8] = '1';
    grid[5][0] = '7'; grid[5][4] = '2'; grid[5][8] = '6';
    grid[6][1] = '6'; grid[6][6] = '2'; grid[6][7] = '8';
    grid[7][3] = '4'; grid[7][4] = '1'; grid[7][5] = '9'; grid[7][8] = '5';
    grid[8][4] = '8'; grid[8][7] = '7'; grid[8][8] = '9';
    return grid;
};

// Fonction pour vérifier si le Sudoku est valide
const isValidSudoku = (grid) => {
    const checkBlock = (arr) => {
        const filtered = arr.filter((num) => num !== '');
        return new Set(filtered).size === filtered.length;
    };

    for (let i = 0; i < 9; i++) {
        const row = grid[i];
        const col = grid.map(row => row[i]);
        if (!checkBlock(row) || !checkBlock(col)) return false;
    }

    // Vérifier les sous-grilles 3x3
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const block = [];
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    block.push(grid[i + r][j + c]);
                }
            }
            if (!checkBlock(block)) return false;
        }
    }
    return true;
};

function SudokuGrid() {
    const [grid, setGrid] = useState(generateSudoku());
    const [message, setMessage] = useState('');

    // Gérer les entrées de l'utilisateur
    const handleChange = (row, col, value) => {
        const newGrid = grid.map(row => [...row]);
        if (/^[1-9]?$/.test(value)) {
            newGrid[row][col] = value;
        }
        setGrid(newGrid);
    };

    // Vérification de la solution
    const handleCheckSolution = () => {
        if (isValidSudoku(grid)) {
            setMessage('Félicitations ! Sudoku valide 🎉');
        } else {
            setMessage('Erreur : La solution est incorrecte ❌');
        }
    };

    // Réinitialiser la grille
    const handleReset = () => {
        setGrid(generateSudoku());
        setMessage('');
    };

    return (
        <div className="sudoku-container">
            <h1>Sudoku</h1>
            <div className="sudoku-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, colIndex) => (
                            <input
                                key={`${rowIndex}-${colIndex}`}
                                className="sudoku-cell"
                                type="text"
                                maxLength="1"
                                value={cell}
                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button onClick={handleCheckSolution}>Vérifier la solution</button>
                <button onClick={handleReset}>Réinitialiser</button>
            </div>
            {/* //| 5 | 3 | 4 | 6 | 7 | 8 | 9 | 1 | 2 | | 6 | 7 | 2 | 1 | 9 | 5 | 3 | 4 | 8 | | 1 | 9 | 8 | 3 | 4 | 2 | 5 | 6 | 7 | | 8 | 5 | 9 | 7 | 6 | 1 | 4 | 2 | 3 | | 4 | 2 | 6 | 8 | 5 | 3 | 7 | 9 | 1 | | 7 | 1 | a a | 9 | 2 | 4 | 8 | 5 | 6 | | 9 | 6 | 1 | 5 | 3 | 7 | 2 | 8 | 4 | | 2 | 8 | 7 | 4 | 1 | 9 | 6 | 3 | 5 | | 3 | 4 | 5 | 2 | 8 | 6 | 1 | 7 | 9 | */}

            {message && <div className="message">{message}</div>}
        </div>
    );
}


export default SudokuGrid;

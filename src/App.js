import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TicTacToe from './components/TicTacToe'; // Import du composent Tic tac toe
import Connect4 from './components/Connect4'; // Import du composent puissance 4
import Sudoku from './components/Sudoku'; // Import du composent Soduku
import './components/css/App.css'; // Import du css

function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/tictactoe">Jouer à Tic-Tac-Toe</Link></li>
                    <li><Link to="/Connect4">Jouer à Connect 4</Link></li>
                    <li><Link to="/Sudoku">Jouer à Sudoku</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/tictactoe" element={<TicTacToe />} />
                <Route path="/Connect4" element={<Connect4 />} />
                <Route path="/Sudoku" element={<Sudoku />} />
            </Routes>
        </div>
    );
}

const Accueil = () => (
    <div>
        <h1>Bienvenue sur la page de jeu</h1>
    </div>
);

export default App;

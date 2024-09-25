import React from 'react';
import ReactDOM from 'react-dom/client'; // assure-toi d'utiliser React 18 si c'est le cas
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

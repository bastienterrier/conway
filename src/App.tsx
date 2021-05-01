import React from 'react';
import './App.css';
import Board from './components/board/Board';

const App = () => {
  return (
    <div className="App">
      <h1>Conway's game of life</h1>

      <Board width={5} height={2} />
    </div>
  );
};

export default App;

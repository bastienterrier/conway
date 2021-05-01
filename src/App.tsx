import React from 'react';
import './App.css';
import BoardContainer from './components/board/container/BoardContainer';

const App = () => {
  return (
    <div className="App">
      <h1>Conway's game of life</h1>

      <BoardContainer width={50} height={20} />
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import BoardContainer from './components/board/container/BoardContainer';
import { CellProps } from './components/cell/Cell';

const convertInitialStateToCellProps = (input: number[][]): CellProps[][] => {
  return input.map((row) => row.map((col) => ({ isAlive: !!col })));
};

const initialState = [
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];

const App = () => {
  return (
    <div className="App">
      <h1>Conway's game of life</h1>

      <BoardContainer
        width={5}
        height={5}
        initialState={convertInitialStateToCellProps(initialState)}
      />
    </div>
  );
};

export default App;

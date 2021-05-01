import React from 'react';
import Cell from '../cell/Cell';

import styles from './Board.module.scss';

interface BoardProps {
  width: number;
  height: number;
}

const Board = ({ width, height }: BoardProps) => {
  return (
    <div className={styles.board}>
      {Array.apply(null, Array(width)).map((_, x) => {
        console.log('coucou');
        return (
          <div className={styles.row} key={'row-' + x}>
            {Array.apply(null, Array(height)).map((_, y) => {
              return <Cell isAlive key={'row-' + x + 'col-' + y} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

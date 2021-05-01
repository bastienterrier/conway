import React, { useEffect, useState } from 'react';
import Cell, { CellProps } from '../cell/Cell';

import styles from './Board.module.scss';

interface BoardProps {
  cells: CellProps[][];
}

const Board = ({ cells }: BoardProps) => {
  return (
    <div className={styles.board}>
      {cells.map((row, x) => {
        return (
          <div className={styles.row} key={'row-' + x}>
            {row.map((cell, y) => {
              return (
                <Cell isAlive={cell.isAlive} key={'row-' + x + 'col-' + y} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

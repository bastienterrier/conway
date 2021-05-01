import React, { useEffect, useState } from 'react';
import Cell, { CellProps } from '../cell/Cell';

import styles from './Board.module.scss';

interface BoardProps {
  width: number;
  height: number;
}

const generateIsAlive = () => Math.random() > 0.8;

const Board = ({ width, height }: BoardProps) => {
  const [cells, setCells] = useState<CellProps[][]>([]);

  useEffect(() => {
    const cellsCopy: CellProps[][] = [];
    for (let i = 0; i < height; i++) {
      cellsCopy[i] = [];

      for (let j = 0; j < width; j++) {
        cellsCopy[i][j] = {
          isAlive: generateIsAlive(),
        };
      }
    }

    setCells(cellsCopy);
  }, []);

  return (
    <div className={styles.board}>
      {cells.map((cellRow, x) => {
        return (
          <div className={styles.row} key={'row-' + x}>
            {cellRow.map((cellCol, y) => {
              return (
                <Cell isAlive={cellCol.isAlive} key={'row-' + x + 'col-' + y} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

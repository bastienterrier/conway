import React, { useEffect, useState } from 'react';
import { CellProps } from '../../cell/Cell';
import Board from '../Board';

const generateIsAlive = () => Math.random() > 0.8;

interface BoardContainerProps {
  width: number;
  height: number;
}

const computeState = (
  x: number,
  y: number,
  width: number,
  height: number
) => {};

const updateCells = (cells: CellProps[][], setCells: any) => {
  if (!cells.length) {
    return;
  }

  const cellsCopy: CellProps[][] = [];
  cells.forEach((row, x) => {
    cellsCopy[x] = [];
    row.forEach((cell, y) => {
      cellsCopy[x][y] = {
        isAlive: !cell.isAlive,
      };
    });
  });

  setCells(cellsCopy);
};

const initCells = (width: number, height: number, setCells: any) => {
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
};

const BoardContainer = ({ width, height }: BoardContainerProps) => {
  const [cells, setCells] = useState<CellProps[][]>([]);

  useEffect(() => {
    initCells(width, height, setCells);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateCells(cells, setCells);
    }, 1000);
  }, [cells]);

  return <Board cells={cells} />;
};

export default BoardContainer;

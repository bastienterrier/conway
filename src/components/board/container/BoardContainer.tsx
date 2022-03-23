import React, { useEffect, useState } from 'react';
import { hexToRgb, rgbToHex } from '../../../helpers/color.helper';
import { CellProps } from '../../cell/Cell';
import Board from '../Board';

const generateIsAlive = () => Math.random() > 0.5;

const generateColor = () => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);

  return rgbToHex(r, g, b);
};
interface BoardContainerProps {
  width: number;
  height: number;
  initialState?: CellProps[][];
}

const getAliveNeighbours = (
  cells: CellProps[][],
  x: number,
  y: number,
  width: number,
  height: number
): number => {
  let aliveCells = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      let targetX = x + i;
      let targetY = y + j;

      if (targetX < 0) {
        targetX = height - 1;
      }
      if (targetX >= height) {
        targetX = 0;
      }
      if (targetY < 0) {
        targetY = width - 1;
      }
      if (targetY >= width) {
        targetY = 0;
      }

      if (cells[targetX][targetY].isAlive) {
        aliveCells++;
      }
    }
  }

  return aliveCells;
};

const computeNewColor = (
  cells: CellProps[][],
  x: number,
  y: number,
  width: number,
  height: number
): string => {
  let rTotal: number = 0;
  let gTotal: number = 0;
  let bTotal: number = 0;
  let aliveCells = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      let targetX = x + i;
      let targetY = y + j;

      if (targetX < 0) {
        targetX = height - 1;
      }
      if (targetX >= height) {
        targetX = 0;
      }
      if (targetY < 0) {
        targetY = width - 1;
      }
      if (targetY >= width) {
        targetY = 0;
      }

      const currentCell = cells[targetX][targetY];
      if (currentCell.isAlive) {
        rTotal += hexToRgb(currentCell.color).r;
        gTotal += hexToRgb(currentCell.color).g;
        bTotal += hexToRgb(currentCell.color).b;
        aliveCells++;
      }
    }
  }

  return rgbToHex(
    Math.round(rTotal / aliveCells),
    Math.round(gTotal / aliveCells),
    Math.round(bTotal / aliveCells)
  );
};

const computeNextState = (
  cells: CellProps[][],
  x: number,
  y: number,
  width: number,
  height: number
): CellProps => {
  const aliveNeighbours = getAliveNeighbours(cells, x, y, width, height);
  const currentState = cells[x][y];

  // survives
  if (
    currentState.isAlive &&
    (aliveNeighbours === 2 || aliveNeighbours === 3)
  ) {
    return {
      isAlive: true,
      color: currentState.color,
    };
  }

  // becomes a live cell
  if (!currentState.isAlive && aliveNeighbours === 3) {
    const color = computeNewColor(cells, x, y, width, height);

    console.log('color', color);

    return {
      isAlive: true,
      color,
    };
  }

  // dead cell
  return {
    isAlive: false,
    color: currentState.color,
  };
};

const updateCells = (
  width: number,
  height: number,
  cells: CellProps[][],
  setCells: any
) => {
  if (!cells.length) {
    return;
  }

  const cellsCopy: CellProps[][] = [];
  cells.forEach((row, x) => {
    cellsCopy[x] = [];
    row.forEach((cell, y) => {
      cellsCopy[x][y] = computeNextState(cells, x, y, width, height);
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
        color: generateColor(),
      };
    }
  }

  setCells(cellsCopy);
};

const BoardContainer = ({
  width,
  height,
  initialState = [],
}: BoardContainerProps) => {
  const [cells, setCells] = useState<CellProps[][]>(initialState);

  useEffect(() => {
    if (!initialState.length) {
      initCells(width, height, setCells);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateCells(width, height, cells, setCells);
    }, 200);
  }, [cells]);

  return <Board cells={cells} />;
};

export default BoardContainer;

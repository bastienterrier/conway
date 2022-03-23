import React from 'react';

import styles from './Cell.module.scss';

export interface CellProps {
  isAlive: boolean;
  color: string;
}

const Cell = ({ isAlive, color }: CellProps) => {
  const style = isAlive ? { backgroundColor: color } : {};

  return <div className={styles.cell} style={style}></div>;
};

export default Cell;

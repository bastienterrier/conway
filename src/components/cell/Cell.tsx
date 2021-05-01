import React from 'react';

import styles from './Cell.module.scss';

export interface CellProps {
  isAlive: boolean;
}

const Cell = ({ isAlive }: CellProps) => {
  const cssClasses = [styles.cell];

  if (isAlive) {
    cssClasses.push(styles['cell--alive']);
  }

  return <div className={cssClasses.join(' ')}></div>;
};

export default Cell;

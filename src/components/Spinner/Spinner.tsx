import type React from 'react';
import styles from './Spinner.module.scss';

type Props = { width: string | number; height: string | number };

export const Spinner: React.FC<Props> = ({ width, height }) => {
  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;

  return <div className={styles.spinner} style={{ width: w, height: h }} />;
};

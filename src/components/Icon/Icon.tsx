import type React from 'react';
import styles from './Icon.module.scss';

const ICONS_SPRITE_PATH = './icons.svg';
const ICON_SIZE_24 = 24;

type Props = {
  name: string;
  color?: string;
  size?: number;
};

export const Icon: React.FC<Props> = ({ name, color, size = ICON_SIZE_24 }) => {
  const iconHref = `${ICONS_SPRITE_PATH}#${name}-icon`;

  return (
    <svg
      className={styles.icon}
      style={{ color: color }}
      width={`${size}px`}
      height={`${size}px`}
      aria-hidden="true"
    >
      <use href={iconHref} />
    </svg>
  );
};

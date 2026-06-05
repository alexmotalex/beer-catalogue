import type React from 'react';
import styles from './Icon.module.scss';

const ICONS_SPRITE_PATH = './icons.svg';
const ICON_SIZE_24 = 24;

type Props = {
  name: string;
  size?: number;
};

export const Icon: React.FC<Props> = ({ name, size = ICON_SIZE_24 }) => {
  const iconHref = `${ICONS_SPRITE_PATH}#${name}-icon`;

  return (
    <svg
      className={styles.icon}
      width={`${size}px`}
      height={`${size}px`}
      aria-hidden="true"
    >
      <use href={iconHref} />
    </svg>
  );
};

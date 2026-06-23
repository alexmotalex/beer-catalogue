import type React from 'react';
import styles from './Icon.module.scss';

const ICONS_SPRITE_PATH = `${import.meta.env.BASE_URL}icons.svg`;

type Props = {
  name: string;
};

export const Icon: React.FC<Props> = ({ name }) => {
  const iconHref = `${ICONS_SPRITE_PATH}#${name}-icon`;

  return (
    <svg className={styles.icon} aria-hidden="true">
      <use href={iconHref} />
    </svg>
  );
};

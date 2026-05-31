import type React from 'react';
import styles from './Icon.module.scss';

const ICONS_SPRITE_PATH = './icons.svg';
const ICON_SIZE_24 = 24;

type Props = {
  name: string;
  defaultColor: string;
  activeColor?: string;
  size?: number;
  active?: boolean;
};

export const Icon: React.FC<Props> = ({
  name,
  defaultColor,
  activeColor,
  active = false,
  size = ICON_SIZE_24,
}) => {
  const iconColor = active ? activeColor : defaultColor;

  const iconHref = `${ICONS_SPRITE_PATH}#${name}-icon`;

  return (
    <svg
      className={styles.icon}
      style={{ color: iconColor }}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <use href={iconHref} />
    </svg>
  );
};

import React, { useRef, useState } from 'react';
import styles from './FilterSelector.module.scss';
import { useSearchParams } from 'react-router';
import type { SelectOptions } from '../../types/SelectOptions';
import { setParams } from '../../utils/setParams';
import { useClickOutside } from '../../hooks/UseClickOutside';
import { Icon } from '../Icon';
import clsx from 'clsx';
import { Divider } from '../Divider';

type Props = {
  option: SelectOptions;
};

export const FilterSelector: React.FC<Props> = ({ option }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currentValue = searchParams.get(option.searchParamKey) ?? '';
  const selectedOption = option.filterBy.find(
    item => item.value === currentValue,
  );

  const handleOptionSelect = (value: string) => {
    const newParams = setParams(searchParams, option.searchParamKey, value);

    setSearchParams(newParams);
    setIsOpen(false);
  };

  useClickOutside({
    ref: dropdownRef as React.RefObject<HTMLDivElement>,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.dropdownWrapper}>
        <button
          className={styles.dropdownTrigger}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Search"
        >
          <div className={styles.dropdownTriggerIcon}>
            <Icon name={option.icon} />
          </div>
          <span className={styles.dropdownTriggerTitle}>
            {selectedOption?.value ? selectedOption.title : option.title}
          </span>
          <div className={styles.dropdownTriggerIcon}>
            <Icon name={isOpen ? 'arrow-up' : 'arrow-down'} />
          </div>
        </button>

        <ul
          className={clsx(styles.dropdown, { [styles.dropdownOpen]: isOpen })}
        >
          {option.filterBy.map((item, index) => {
            const isLastItem = index === option.filterBy.length - 1;

            return (
              <li key={item.value}>
                <button
                  onClick={() => handleOptionSelect(item.value)}
                  className={styles.dropdownItem}
                >
                  {item.title}
                </button>
                {!isLastItem && <Divider />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

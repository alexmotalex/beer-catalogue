import React, { useEffect, useRef, useState } from 'react';
import styles from './BeerSearch.module.scss';
import { useSearchParams } from 'react-router';
import { setParams } from '../../utils/setParams';
import { useClickOutside } from '../../hooks/UseClickOutside';
import { Icon } from '../Icon';
import { useDebounce } from 'use-debounce';

export const BeerSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [, setSearchParams] = useSearchParams();
  const [debouncedQuery] = useDebounce(query, 500);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useClickOutside({
    ref: dropdownRef as React.RefObject<HTMLDivElement>,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  useEffect(() => {
    setSearchParams(prev => {
      const currentParam = prev.get('search') || '';

      if (currentParam === debouncedQuery) {
        return prev;
      }

      return setParams(prev, 'search', debouncedQuery);
    });
  }, [debouncedQuery, setSearchParams]);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.dropdownWrapper}>
        <div className={styles.searchContainer}>
          <div className={styles.inputIcon}>
            <Icon name="search" />
          </div>

          <input
            className={styles.dropdownInput}
            type="search"
            name="search"
            placeholder="Enter a beer name"
            value={query}
            onChange={handleQueryChange}
          />

          {query && (
            <button
              type="button"
              className={styles.inputClearButton}
              onClick={() => setQuery('')}
            >
              <Icon name="close" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

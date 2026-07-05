import React, { useEffect, useRef, useState } from 'react';
import styles from './BeerSearch.module.scss';
import { useSearchParams } from 'react-router';
import { setParams } from '../../utils/setParams';
import { Icon } from '../Icon';
import { useDebounce } from 'use-debounce';

export const BeerSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [debouncedQuery] = useDebounce(query, 500);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setSearchParams(prev => {
      const currentSearch = prev.get('search') ?? '';

      if (currentSearch === debouncedQuery) {
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
            aria-label="Search beers"
          />

          {query && (
            <button
              type="button"
              className={styles.inputClearButton}
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <Icon name="close" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

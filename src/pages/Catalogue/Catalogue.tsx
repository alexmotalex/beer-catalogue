import { useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { FilterSelector } from '../../components/FilterSelector';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { SlowServerMessage } from '../../components/SlowServerMessage';
import { Toast } from '../../components/Toast';
import { useBeers } from '../../hooks/useBeers';
import { useSlowLoad } from '../../hooks/useSlowLoad';
import { selectOptions } from '../../constants/selectOptions';
import { BeerSearch } from '../../components/BeerSearch';
import clsx from 'clsx';
import styles from './Catalogue.module.scss';
import { Spinner } from '../../components/Spinner';

export const Catalogue = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState('tick');
  const { beers, nextOffset, loadBeers, isLoading } = useBeers();
  const isSlow = useSlowLoad(isLoading);

  const handleViewAll = async () => {
    loadBeers(nextOffset);
  };

  const renderContent = () => {
    if (isLoading && beers.length === 0) {
      return (
        <>
          {isSlow && <SlowServerMessage />}
          <ul className={styles.productList}>
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className={styles.productItem}>
                <ProductCardSkeleton />
              </li>
            ))}
          </ul>
        </>
      );
    }

    if (beers.length === 0) {
      return <div>No beers found</div>;
    }

    return (
      <ul className={styles.productList}>
        {beers.map(beer => (
          <li key={beer.id} className={styles.productItem}>
            <ProductCard
              product={beer}
              setToast={setToast}
              setToastIcon={setToastIcon}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={clsx('pageContent', styles.catalogue)}>
      {toast && (
        <Toast title={toast} onClose={() => setToast(null)} icon={toastIcon} />
      )}

      <div className={styles.filterToolbar}>
        <div className={styles.search}>
          <BeerSearch />
        </div>

        <ul className={styles.selectContent}>
          {selectOptions.map(option => (
            <li
              key={option.searchParamKey}
              className={styles.selectContentItem}
            >
              <FilterSelector key={option.searchParamKey} option={option} />
            </li>
          ))}
        </ul>
      </div>

      {renderContent()}

      {nextOffset && (
        <div className={styles.button}>
          <SecondaryButton
            type="button"
            title={isLoading ? 'Loading...' : 'Load more'}
            onClick={handleViewAll}
            icon={isLoading ? <Spinner width={16} height={16} /> : undefined}
          />
        </div>
      )}
    </section>
  );
};

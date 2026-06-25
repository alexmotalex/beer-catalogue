import clsx from 'clsx';
import { ProductCard } from '../../components/ProductCard';
import { useBeers } from '../../hooks/useBeers';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { FilterSelector } from '../../components/FilterSelector';
import { selectOptions } from '../../constants/selectOptions';
import styles from './Catalogue.module.scss';
import { BeerSearch } from '../../components/BeerSearch';

export const Catalogue = () => {
  const { beers, nextOffset, loadBeers } = useBeers();

  const handleViewAll = async () => {
    loadBeers(nextOffset);
  };

  return (
    <section className={clsx('pageContent', styles.catalogue)}>
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

      {beers.length === 0 ? (
        <div>No beers</div>
      ) : (
        <ul className={styles.productList}>
          {beers.map(beer => (
            <li key={beer.id} className={styles.productItem}>
              <ProductCard product={beer} />
            </li>
          ))}
        </ul>
      )}

      {nextOffset && (
        <div className={styles.button}>
          <SecondaryButton
            type="button"
            title="Load more"
            onClick={handleViewAll}
          />
        </div>
      )}
    </section>
  );
};

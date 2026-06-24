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
        <BeerSearch />

        <div className={styles.selectContent}>
          {selectOptions.map(option => (
            <FilterSelector key={option.searchParamKey} option={option} />
          ))}
        </div>
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
            title="View all"
            onClick={handleViewAll}
          />
        </div>
      )}
    </section>
  );
};

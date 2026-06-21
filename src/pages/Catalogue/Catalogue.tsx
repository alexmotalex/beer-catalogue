import clsx from 'clsx';
import { ProductCard } from '../../components/ProductCard';
import { useBeers } from '../../hooks/useBeers';
import styles from './Catalogue.module.scss';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';

export const Catalogue = () => {
  const { beers, nextOffset, loadBeers } = useBeers();

  if (!beers) {
    return <div>There is no beer</div>;
  }

  const handleViewAll = async () => {
    loadBeers(nextOffset);
  };

  return (
    <section className={clsx('pageContent', styles.catalogue)}>
      <ul className={styles.productList}>
        {beers.map(beer => (
          <li key={beer.id} className={styles.productItem}>
            <ProductCard product={beer} />
          </li>
        ))}
      </ul>

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

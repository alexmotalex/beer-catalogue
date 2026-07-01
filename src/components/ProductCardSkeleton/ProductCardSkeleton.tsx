import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => (
  <div className={styles.card}>
    <div className={styles.image} />
    <div className={styles.info}>
      <div className={styles.title} />
      <div className={styles.price} />
    </div>
    <div className={styles.specs}>
      <div className={styles.spec} />
      <div className={styles.spec} />
      <div className={styles.spec} />
      <div className={styles.spec} />
    </div>
    <div className={styles.button} />
  </div>
);

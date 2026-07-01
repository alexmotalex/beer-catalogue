import styles from './CartItemSkeleton.module.scss';

export const CartItemSkeleton = () => {
  return (
    <article className={styles.cartItem}>
      <div className={styles.image} />

      <div className={styles.info}>
        <div className={styles.product}>
          <div className={styles.header}>
            <div className={styles.name} />
            <div className={styles.price} />
          </div>

          <div className={styles.volume} />
        </div>

        <div className={styles.stepper} />
      </div>
    </article>
  );
};

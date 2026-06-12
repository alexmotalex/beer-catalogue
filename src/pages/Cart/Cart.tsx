import styles from './Cart.module.scss';

export const Cart = () => {
  return (
    <section className={styles.cart}>
      <div className={styles.cartMain}>
        <div className={styles.cartMainText}>
          <h1 className={styles.cartMainTitle}>Cart</h1>
          <button className={styles.cartMainClearCart}>Clear Cart</button>
        </div>

        <div className={styles.cartMainProductList}></div>
      </div>

      <div className={styles.cartSummary}>
        <h2 className={styles.cartSummaryTitle}>Your summary</h2>

        <div className={styles.cartSummaryTotal}></div>
      </div>
    </section>
  );
};

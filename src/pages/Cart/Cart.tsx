import React from 'react';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { Divider } from '../../components/Divider';
import styles from './Cart.module.scss';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../components/CartItem';

export const Cart = () => {
  const { cartItems, subtotal, total, isLoading, error, clearCart } = useCart();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (cartItems.length === 0) return <div>Cart is empty</div>;

  const summaryItems = [
    { title: 'Subtotal', value: `$${subtotal}` },
    { title: 'Delivery fee', value: '$4' },
    { title: 'Discounts', value: '$0' },
  ];

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className={styles.cart}>
      <section className={styles.main}>
        <div className={styles.mainHeader}>
          <h1 className={styles.mainTitle}>Cart</h1>
          <button className={styles.mainClearButton} onClick={handleClearCart}>
            Clear cart
          </button>
        </div>

        <ul className={styles.mainProductList}>
          {cartItems.map(item => (
            <li key={item.id} className={styles.mainProductItem}>
              <CartItem cartItem={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.summary}>
        <div className={styles.summaryWrapper}>
          <h2 className={styles.summaryTitle}>Your summary</h2>

          {summaryItems.map(({ title, value }, index) => {
            const isLastItem = index === summaryItems.length - 1;

            return (
              <React.Fragment key={title}>
                <div className={styles.summaryInfo}>
                  <div className={styles.summaryInfoItem}>
                    <p className={styles.summarySubtitle}>{title}</p>
                    <p className={styles.summaryPrice}>{value}</p>
                  </div>
                </div>

                {!isLastItem && <Divider />}
              </React.Fragment>
            );
          })}

          <div className={styles.summaryInfo}>
            <div className={styles.summaryInfoItem}>
              <p className={styles.summaryTotalTitle}>Total</p>
              <p className={styles.summaryTotalPrice}>${total}</p>
            </div>
          </div>
        </div>

        <div className={styles.summaryButtons}>
          <SecondaryButton type="button" title="Add more item" />

          <PrimaryButton type="button" title="Checkout" />
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { CartItem } from '../../components/CartItem';
import { BasketModal } from '../../components/BasketModal';
import { Divider } from '../../components/Divider';
import { useCart } from '../../hooks/useCart';
import { ROUTES } from '../../constants/routes';
import { NotFound } from '../../components/NotFound';
import styles from './Cart.module.scss';

export const Cart = () => {
  const { cartItems, subtotal, total, error, isLoading, clearCart } = useCart();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const isCartEmpty = cartItems.length === 0;
  const cartItemsToRender = cartItems.sort((a, b) => a.id - b.id);

  if (!isLoading && error) {
    return <div>{error}</div>;
  }

  const handleConfirm = () => {
    void clearCart();
    setModalIsOpen(false);
  };

  const handleMoreItem = () => {
    navigate(ROUTES.catalogue);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const summaryItems = [
    { title: 'Subtotal', value: `$${subtotal}` },
    { title: 'Delivery fee', value: '$5' },
    { title: 'Discounts', value: '$0' },
  ];

  return (
    <div className={styles.cart}>
      <BasketModal
        isOpen={modalIsOpen}
        cancelFn={closeModal}
        primaryFn={handleConfirm}
      />

      <section className={styles.main}>
        <div className={styles.mainHeader}>
          <h1 className={styles.mainTitle}>Cart</h1>
          {!isCartEmpty && (
            <button className={styles.mainClearButton} onClick={openModal}>
              Clear cart
            </button>
          )}
        </div>

        {!isLoading && isCartEmpty ? (
          <div className={styles.cartNotFound}>
            <NotFound />
          </div>
        ) : (
          <ul className={styles.mainProductList}>
            {cartItemsToRender.map(item => (
              <li key={item.id} className={styles.mainProductItem}>
                <CartItem cartItem={item} />
              </li>
            ))}
          </ul>
        )}
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
          <SecondaryButton
            type="button"
            title="Add more item"
            onClick={handleMoreItem}
          />

          <PrimaryButton
            type="button"
            disabled={isCartEmpty}
            title="Checkout"
            onClick={openModal}
          />
        </div>
      </section>
    </div>
  );
};

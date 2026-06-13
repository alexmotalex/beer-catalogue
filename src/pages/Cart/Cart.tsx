import React from 'react';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { SecondaryButton } from '../../components/Buttons/SecondaryButton';
import { CartItem } from '../../components/CartItem';
import { Divider } from '../../components/Divider';
import type { CartEntry } from '../../types/CartEntry';
import styles from './Cart.module.scss';

export const Cart = () => {
  const beer = {
    id: 1,
    name: 'Amber Dawn Lager',
    price: '4.90',
    image_url: './img/product_img.jpg',
    alcohol_percentage: '4.50',
    is_filtered: true,
    beer_type: 'light',
    volume: 500,
    is_available: true,
    description:
      'A Czech beer whose recipe was developed back in 1842 by the German Josef Groll. It is based on three classic ingredients: spring water, malt, and Žatec hops with a low alpha acid content.The beer’s distinctive features are its rich malty flavor and noble bitterness. Its refined hoppy aroma and intense flavor are achieved through a unique brewing process based on triple wort boiling.',
  };

  const cartList: CartEntry[] = [
    { id: 1, qty: 2, product: beer },
    { id: 1, qty: 1, product: beer },
    { id: 1, qty: 1, product: beer },
    { id: 1, qty: 1, product: beer },
    { id: 1, qty: 1, product: beer },
  ];
  const hasCartItems = cartList.length > 0;

  if (!hasCartItems) {
    return <div>ProductsNotFound</div>;
  }

  const summaryItems = [
    {
      title: 'Subtotal',
      value: '$18.99',
    },
    {
      title: 'Delivery fee',
      value: '$4',
    },
    {
      title: 'Discounts',
      value: '$0',
    },
  ];

  return (
    <div className={styles.cart}>
      <section className={styles.main}>
        <div className={styles.mainHeader}>
          <h1 className={styles.mainTitle}>Cart</h1>
          <button className={styles.mainClearButton}>Clear cart</button>
        </div>

        <ul className={styles.mainProductList}>
          {cartList.map(item => (
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
              <p className={styles.summaryTotalPrice}>$22.99</p>
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

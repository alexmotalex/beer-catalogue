import styles from './CartItem.module.scss';

// type Props = {
//   cartEntry: CartEntry;
//   onDelete: (id: string) => void;
//   updateQty: (id: string, qtyChange: number) => void;
// };

export const CartItem = () => {
  return <article className={styles.cartItem}></article>;
};

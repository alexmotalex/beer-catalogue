import { Link } from 'react-router';
import { buildProductPath } from '../../utils/buildProductPath ';
import { Stepper } from '../Stepper';
import type { CartEntry } from '../../types/Cart';
import styles from './CartItem.module.scss';

type Props = {
  cartItem: CartEntry;
  onDelete?: (id: string) => void;
  updateQty?: (id: string, qtyChange: number) => void;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { id, quantity, name, price, image_url } = cartItem;

  const handleIncrease = () => {};
  const handleDecrease = () => {};
  const handleDelete = () => {};

  const productPath = buildProductPath(id);

  return (
    <article className={styles.cartItem}>
      <Link to={productPath} className={styles.imageLink}>
        <img
          src={image_url}
          className={styles.productImage}
          alt={name}
          loading="lazy"
        />
      </Link>

      <div className={styles.info}>
        <div className={styles.product}>
          <div className={styles.header}>
            <p className={styles.name}>{name}</p>

            <p className={styles.price}>${price}</p>
          </div>

          <span className={styles.volume}>{500}ml</span>
        </div>

        <Stepper
          value={quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onDelete={handleDelete}
        />
      </div>
    </article>
  );
};

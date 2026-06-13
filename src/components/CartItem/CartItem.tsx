import { Link } from 'react-router';
import type { CartEntry } from '../../types/CartEntry';
import { buildProductPath } from '../../utils/buildProductPath ';
import styles from './CartItem.module.scss';
import { Stepper } from '../Stepper';

type Props = {
  cartItem: CartEntry;
  onDelete?: (id: string) => void;
  updateQty?: (id: string, qtyChange: number) => void;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { qty, product } = cartItem;

  const handleIncrease = () => {};
  const handleDecrease = () => {};
  const handleDelete = () => {};

  const productPath = buildProductPath(1);
  return (
    <article className={styles.cartItem}>
      <Link to={productPath} className={styles.imageLink}>
        <img
          src={product.image_url}
          className={styles.productImage}
          alt={product.name}
          loading="lazy"
        />
      </Link>

      <div className={styles.info}>
        <div className={styles.product}>
          <div className={styles.header}>
            <p className={styles.name}>{product.name}</p>

            <p className={styles.price}>${product.price}</p>
          </div>

          <span className={styles.volume}>{product.volume}ml</span>
        </div>

        <Stepper
          value={qty}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onDelete={handleDelete}
        />
      </div>
    </article>
  );
};

import { Link } from 'react-router';
import { buildProductPath } from '../../utils/buildProductPath ';
import { Stepper } from '../Stepper';
import type { CartEntry } from '../../types/Cart';
import { useCart } from '../../hooks/useCart';
import { ErrorInfo } from '../ErrorInfo';
import styles from './CartItem.module.scss';

type Props = {
  cartItem: CartEntry;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { addToCart, deleteFromCart, itemErrors } = useCart();
  const { id, beer_id, quantity, name, price, image_url } = cartItem;
  const error = itemErrors.get(beer_id);

  const handleIncrease = () => {
    addToCart(beer_id);
  };
  const handleDecrease = () => {
    deleteFromCart(id, beer_id);
  };

  const productPath = buildProductPath(beer_id);

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

          <span className={styles.volume}>500ml</span>
        </div>

        {error && <ErrorInfo errorText={error} />}

        <Stepper
          value={quantity}
          error={Boolean(error)}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onDelete={handleDecrease}
        />
      </div>
    </article>
  );
};

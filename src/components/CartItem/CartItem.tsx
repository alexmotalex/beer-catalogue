import { Link } from 'react-router';
import { buildProductPath } from '../../utils/buildProductPath';
import { Stepper } from '../Stepper';
import type { CartEntry } from '../../types/Cart';
import { useCart } from '../../hooks/useCart';
import { ErrorInfo } from '../ErrorInfo';
import placeholderBeer from '../../assets/images/beer-placeholder.webp';
import styles from './CartItem.module.scss';
import { resolvePublicUrl } from '../../utils/resolvePublicUrl';

type Props = {
  cartItem: CartEntry;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { updateCartItemQuantity, deleteFromCart, itemErrors, isLoading } =
    useCart();
  const { id, beer_id, quantity, name, price, image_url } = cartItem;
  const error = itemErrors.get(beer_id);

  const imageSrc = image_url ? resolvePublicUrl(image_url) : placeholderBeer;
  const totalItemPrice = Number(price) * quantity;
  const displayedPrice = `$${totalItemPrice.toFixed(2)}`;

  const handleIncrease = () => {
    updateCartItemQuantity(id, beer_id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      deleteFromCart(id, beer_id);
      return;
    }

    updateCartItemQuantity(id, beer_id, quantity - 1);
  };

  const handleDelete = () => {
    deleteFromCart(id, beer_id);
  };

  const handleManualChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      deleteFromCart(id, beer_id);
      return;
    }

    updateCartItemQuantity(id, beer_id, newQuantity);
  };

  const productPath = buildProductPath(beer_id);

  return (
    <article className={styles.cartItem}>
      <Link to={productPath} className={styles.imageLink}>
        <img
          src={imageSrc}
          className={styles.productImage}
          alt={name}
          loading="lazy"
        />
      </Link>

      <div className={styles.info}>
        <div className={styles.product}>
          <div className={styles.header}>
            <p className={styles.name}>{name}</p>

            <p className={styles.price}>{displayedPrice}</p>
          </div>

          <span className={styles.volume}>500ml</span>
        </div>

        {error && <ErrorInfo errorText={error} />}

        <Stepper
          value={quantity}
          error={Boolean(error)}
          isLoading={Boolean(isLoading)}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onDelete={handleDelete}
          onChange={handleManualChange}
        />
      </div>
    </article>
  );
};

import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';

export default function CartButton() {
  const { openCart } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    return openCart();
  }
  return (
    <button
      className="site-header__action-btn"
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <CartIcon />
      <span className="site-header__badge">
        {totalItems}
      </span>
    </button>
  );
}

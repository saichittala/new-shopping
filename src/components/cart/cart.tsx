import Scrollbar from '@components/common/scrollbar';
import { useCart } from '@contexts/cart/cart.context';
import { motion } from 'framer-motion';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { useUI } from '@contexts/ui.context';
import usePrice from '@framework/product/use-price';
import { IoClose } from 'react-icons/io5';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import Button from '@components/ui/button';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';

export default function Cart() {
  const { t } = useTranslation('common');
  const { closeCart } = useUI();
  const { items, total, isEmpty } = useCart();
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });

  return (
    <div className="cart-panel">
      {/* Header */}
      <div className="cart-panel__header">
        <h3 className="cart-panel__title">
          {/* @ts-ignore */}
          {t('text-shopping-cart')}
        </h3>
        <button
          className="cart-panel__close-btn"
          onClick={closeCart}
          aria-label="close"
        >
          <IoClose />
        </button>
      </div>

      {/* Items or Empty state */}
      {!isEmpty ? (
        <Scrollbar className="flex-grow w-full cart-scrollbar">
          <div className="cart-panel__items-wrap">
            {items?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <motion.div
          layout
          initial="from"
          animate="to"
          exit="from"
          variants={fadeInOut(0.25)}
          className="cart-panel__empty"
        >
          <EmptyCart />
          <h3 className="cart-panel__empty-title">
            {/* @ts-ignore */}
            {t('text-empty-cart')}
          </h3>
        </motion.div>
      )}

      {/* Footer: Checkout */}
      <div className="cart-panel__footer" onClick={closeCart}>
        <Button
          href={isEmpty === false ? ROUTES.CHECKOUT : '/'}
          color="secondary"
          size="md"
          className="w-full flex justify-between items-center"
          disabled={isEmpty}
        >
          <span className="cart-panel__checkout-label">
            {/* @ts-ignore */}
            {t('text-proceed-to-checkout')}
          </span>
          <span className="cart-panel__checkout-total">
            <span className="cart-panel__checkout-divider" />
            {cartTotal}
          </span>
        </Button>
      </div>
    </div>
  );
}

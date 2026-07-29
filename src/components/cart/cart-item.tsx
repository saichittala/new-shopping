import Link from '@components/ui/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { IoIosCloseCircle } from 'react-icons/io';
import Counter from '@components/common/counter';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import { useTranslation } from 'next-i18next';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { t } = useTranslation('common');
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();
  const { price } = usePrice({
    amount: item.price,
    currencyCode: 'USD',
  });
  const { price: totalPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: 'USD',
  });

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="cart-item"
      title={item?.name}
    >
      <button
        className="cart-item__remove-btn"
        onClick={() => clearItemFromCart(item.id)}
        aria-label="Remove item"
      >
        <IoIosCloseCircle />
      </button>

      {/* Image */}
      <div className="cart-item__image-wrap">
        <Image
          src={item?.image ?? '/assets/placeholder/cart-item.svg'}
          width={112}
          height={112}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="cart-item__image"
        />
      </div>

      {/* Body */}
      <div className="cart-item__body">
        <Link
          href={`${ROUTES.PRODUCT}/${item?.slug}`}
          className="cart-item__name"
        >
          {generateCartItemName(item.name, item.attributes)}
        </Link>
        {/* @ts-ignore */}
        <span className="cart-item__unit-price">
          {t('text-unit-price')} :&nbsp; {price}
        </span>
        <div className="cart-item__bottom-row">
          <Counter
            quantity={item.quantity}
            onIncrement={() => addItemToCart(item, 1)}
            onDecrement={() => removeItemFromCart(item.id)}
            variant="dark"
          />
          <span className="cart-item__total">{totalPrice}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;

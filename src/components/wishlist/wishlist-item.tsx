import React from 'react';
import Link from '@components/ui/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';
import { useWishlist, WishlistItem } from '@contexts/wishlist.context';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';

type WishlistItemProps = {
  item: WishlistItem;
};

const WishlistItemComponent: React.FC<WishlistItemProps> = ({ item }) => {
  const { addItemToCart } = useCart();
  const { removeItemFromWishlist } = useWishlist();
  const { price } = usePrice({
    amount: item.sale_price ? item.sale_price : item.price,
    currencyCode: 'USD',
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItemToCart(
      {
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: item.image?.thumbnail ?? '',
        price: item.sale_price ? item.sale_price : item.price,
      },
      1
    );
  };

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="wishlist-item"
      title={item?.name}
    >
      <button
        className="wishlist-item__remove-btn"
        onClick={() => removeItemFromWishlist(item.id)}
        aria-label="Remove item"
      >
        <IoIosCloseCircle />
      </button>

      {/* Image */}
      <div className="wishlist-item__image-wrap">
        <Image
          src={item?.image?.thumbnail ?? '/assets/placeholder/cart-item.svg'}
          width={112}
          height={112}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="wishlist-item__image"
        />
      </div>

      {/* Body */}
      <div className="wishlist-item__body">
        <Link
          href={`${ROUTES.PRODUCT}/${item?.slug}`}
          className="wishlist-item__name"
        >
          {item.name}
        </Link>
        <span className="wishlist-item__price">{price}</span>
        <div className="wishlist-item__bottom-row">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="h-8 !px-3 !text-xs"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistItemComponent;

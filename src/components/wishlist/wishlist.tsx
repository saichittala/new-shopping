import Scrollbar from '@components/common/scrollbar';
import { useWishlist } from '@contexts/wishlist.context';
import { motion } from 'framer-motion';
import { fadeInOut } from '@utils/motion/fade-in-out';
import { useUI } from '@contexts/ui.context';
import { IoClose } from 'react-icons/io5';
import WishlistItemComponent from './wishlist-item';
import EmptyWishlist from './empty-wishlist';
import Button from '@components/ui/button';
export default function Wishlist() {
  const { closeWishlist } = useUI();
  const { items, totalItems } = useWishlist();
  const isEmpty = totalItems === 0;

  return (
    <div className="wishlist-panel">
      {/* Header */}
      <div className="wishlist-panel__header">
        <h3 className="wishlist-panel__title">
          Wishlist
        </h3>
        <button
          className="wishlist-panel__close-btn"
          onClick={closeWishlist}
          aria-label="close"
        >
          <IoClose />
        </button>
      </div>

      {/* Items or Empty state */}
      {!isEmpty ? (
        <Scrollbar className="flex-grow w-full wishlist-scrollbar">
          <div className="wishlist-panel__items-wrap">
            {items?.map((item) => (
              <WishlistItemComponent item={item} key={item.id} />
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
          className="wishlist-panel__empty"
        >
          <EmptyWishlist />
          <h3 className="wishlist-panel__empty-title">
            Your wishlist is empty.
          </h3>
        </motion.div>
      )}

      {/* Footer: Keep Shopping */}
      <div className="wishlist-panel__footer" onClick={closeWishlist}>
        <Button
          variant="slim"
          className="w-full"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

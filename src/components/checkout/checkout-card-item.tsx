import { Item } from "@contexts/cart/cart.utils";
import { generateCartItemName } from "@utils/generate-cart-item-name";
import usePrice from "@framework/product/use-price";
import Image from "next/image";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: "USD",
  });
  return (
    <div className="checkout-item">
      <div className="checkout-item__image-wrap">
        <Image
          src={item.image ?? "/assets/placeholder/order-product.svg"}
          alt="product image"
          className="checkout-item__image"
          fill
        />
      </div>
      <h6 className="checkout-item__name">
        {generateCartItemName(item.name, item.attributes)}
      </h6>
      <div className="checkout-item__total">
        {price}
      </div>
    </div>
  );
};

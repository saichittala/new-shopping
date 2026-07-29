import React from "react";

type FooterItemProps = {
  id: string;
  name: string;
  price: string;
};

export const CheckoutCardFooterItem: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {
  return (
    <div className="checkout-footer-item">
      {item.name}
      <span className="checkout-footer-item__value">
        {item.price}
      </span>
    </div>
  );
};

import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { CheckoutItem } from "@components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Button from "@components/ui/button";

interface CheckoutCardProps {
  isPending: boolean;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({ isPending }) => {
  const [mounted, setMounted] = useState(false);
  const { items, total, isEmpty } = useCart();
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: "USD",
  });
  const { t } = useTranslation("common");
  const checkoutFooter = [
    {
      id: 1,
      name: t("text-sub-total"),
      price: subtotal,
    },
    {
      id: 2,
      name: t("text-shipping"),
      price: t("text-free"),
    },
    {
      id: 3,
      name: t("text-total"),
      price: subtotal,
    },
  ];

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="checkout-page__card">
      <h2 className="checkout-page__title">
        {t("text-your-order")}
      </h2>
      <div className="checkout-page__table-header">
        <span className="checkout-page__table-header-title">{t("text-product")}</span>
        <span className="checkout-page__table-header-subtotal">
          {t("text-sub-total")}
        </span>
      </div>
      {!isEmpty &&
        items.map((item) => <CheckoutItem item={item} key={item.id} />)}
      {isEmpty && (
        <p className="text-red-500 py-4">{t("text-empty-cart")}</p>
      )}
      <div className="checkout-page__card-footer">
        {checkoutFooter.map((item: any) => (
          <CheckoutCardFooterItem item={item} key={item.id} />
        ))}
      </div>
      <Button
        type="submit"
        className="w-full mt-6"
        loading={isPending}
        disabled={isPending || isEmpty}
      >
        {t("common:button-place-order")}
      </Button>
    </div>
  );
};

export default CheckoutCard;

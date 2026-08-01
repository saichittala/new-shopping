import React, { useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ProductPopup() {
  const { t } = useTranslation("common");
  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();
  const router = useRouter();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: "USD",
  });
  const variations = getVariations(data.variations);
  const { slug, image, name, description } = data;

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  function addToCart() {
    if (!isSelected) return;
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
      closeModal();
      setTimeout(() => {
        openCart();
      }, 300);
    }, 600);
    const item = generateCartItem(data!, attributes);
    addItemToCart(item, quantity);
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${slug}`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }

  return (
    <div className="product-popup">
      <div className="product-popup__layout">
        {/* Image panel */}
        <div className="product-popup__image-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              image?.original ??
              "/assets/placeholder/products/product-thumbnail.svg"
            }
            alt={name}
            className="product-popup__image"
          />
        </div>

        {/* Content panel */}
        <div className="product-popup__content">
          {/* Inside Close Button */}
          <button
            onClick={closeModal}
            className="product-popup__close-btn"
            aria-label="Close dialog"
          >
            <CloseIcon />
          </button>

          <div className="product-popup__header">
            {/* Name (clickable) */}
            <div
              className="product-popup__name-link"
              onClick={navigateToProductPage}
              role="button"
            >
              <h2 className="product-popup__name">{name}</h2>
            </div>

            <p className="product-popup__description">{description}</p>

            {/* Price row */}
            <div className="product-popup__price-row">
              <div className="product-popup__price">{price}</div>
              {discount && (
                <del className="product-popup__original-price">{basePrice}</del>
              )}
            </div>
          </div>

          {/* Attributes */}
          {Object.keys(variations).map((variation) => (
            <ProductAttributes
              key={`popup-attribute-key${variation}`}
              title={variation}
              attributes={variations[variation]}
              active={attributes[variation]}
              onClick={handleAttribute}
            />
          ))}

          {/* Actions */}
          <div className="product-popup__actions">
            <div className="product-popup__cart-row">
              <Counter
                quantity={quantity}
                onIncrement={() => {
                  setQuantity((prev) => prev + 1);
                  setViewCartBtn(false);
                }}
                onDecrement={() => {
                  setQuantity((prev) => (prev !== 1 ? prev - 1 : 1));
                  setViewCartBtn(false);
                }}
                disableDecrement={quantity === 1}
              />
              {viewCartBtn ? (
                <Button
                  onClick={navigateToCartPage}
                  color="secondary"
                  size="md"
                  className="w-full"
                >
                  {t("text-view-cart")}
                </Button>
              ) : (
                <Button
                  onClick={addToCart}
                  color="primary"
                  size="md"
                  className="w-full"
                  disabled={!isSelected}
                  isLoading={addToCartLoader}
                >
                  {t("text-add-to-cart")}
                </Button>
              )}
            </div>

            <Button
              onClick={navigateToProductPage}
              color="outline"
              size="md"
              className="w-full"
            >
              {t("text-view-details")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

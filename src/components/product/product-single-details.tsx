import React, { useState } from "react";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useRouter } from "next/router";
import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import Link from "@components/ui/link";

import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "@components/product/product-meta-review";
import { useSsrCompatible } from "@utils/use-ssr-compatible";

const productGalleryCarouselResponsive = {
  "768": { slidesPerView: 2 },
  "0": { slidesPerView: 1 },
};

const ProductSingleDetails: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { data, isLoading } = useProductQuery(slug as string);
  const { addItemToCart } = useCart();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.sale_price ? data.sale_price : data.price,
      baseAmount: data.price,
      currencyCode: "USD",
    }
  );

  if (isLoading) return <p>Loading...</p>;

  const variations = getVariations(data?.variations);
  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  function addToCart() {
    if (!isSelected) return;
    setAddToCartLoader(true);
    setTimeout(() => setAddToCartLoader(false), 600);
    const item = generateCartItem(data!, attributes);
    addItemToCart(item, quantity);
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({ ...prev, ...attribute }));
  }

  return (
    <div className="product-detail">
      {/* Gallery */}
      {width < 1025 ? (
        <Carousel
          pagination={{ clickable: true }}
          breakpoints={productGalleryCarouselResponsive}
          className="product-gallery"
          buttonGroupClassName="hidden"
        >
          {data?.gallery?.map((item, index: number) => (
            <SwiperSlide key={`product-gallery-key-${index}`}>
              <div className="product-detail__gallery-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    item?.original ??
                    "/assets/placeholder/products/product-gallery.svg"
                  }
                  alt={`${data?.name}--${index}`}
                  className="product-detail__gallery-img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="product-detail__gallery">
          {data?.gallery?.map((item, index: number) => (
            <div key={index} className="product-detail__gallery-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  item?.original ??
                  "/assets/placeholder/products/product-gallery.svg"
                }
                alt={`${data?.name}--${index}`}
                className="product-detail__gallery-img"
              />
            </div>
          ))}
        </div>
      )}

      {/* Info panel */}
      <div className="product-detail__info">
        {/* Header: name, description, price */}
        <div className="product-detail__header">
          <h2 className="product-detail__name">{data?.name}</h2>
          <p className="product-detail__description">{data?.description}</p>
          <div className="product-detail__price-row">
            <div className="product-detail__price">{price}</div>
            {discount && (
              <span className="product-detail__original-price">{basePrice}</span>
            )}
          </div>
        </div>

        {/* Attributes */}
        <div className="product-detail__attributes">
          {Object.keys(variations).map((variation) => (
            <ProductAttributes
              key={variation}
              title={variation}
              attributes={variations[variation]}
              active={attributes[variation]}
              onClick={handleAttribute}
            />
          ))}
        </div>

        {/* Counter + Add to Cart */}
        <div className="product-detail__cart-row">
          <Counter
            quantity={quantity}
            onIncrement={() => setQuantity((prev) => prev + 1)}
            onDecrement={() =>
              setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
            }
            disableDecrement={quantity === 1}
          />
          <Button
            onClick={addToCart}
            variant="slim"
            className="w-full md:w-6/12 xl:w-full"
            disabled={!isSelected}
            loading={addToCartLoader}
          >
            <span>Add to cart</span>
          </Button>
        </div>

        {/* Meta (SKU, Category, Tags) */}
        <div className="product-detail__meta">
          <ul className="product-detail__meta-list">
            <li>
              <span className="product-detail__meta-label">SKU:</span>
              {data?.sku}
            </li>
            <li>
              <span className="product-detail__meta-label">Category:</span>
              <Link href="/" className="product-detail__meta-link">
                {data?.category?.name}
              </Link>
            </li>
            {data?.tags && Array.isArray(data.tags) && (
              <li className="product-detail__tags-row">
                <span className="product-detail__meta-label">Tags:</span>
                <div className="product-detail__tags-list">
                  {data.tags.map((tag, idx) => (
                    <Link
                      key={tag.id}
                      href={tag.slug}
                      className="product-detail__tag-link"
                    >
                      {tag.name}
                      {idx < data.tags.length - 1 && (
                        <span className="product-detail__meta-label">,</span>
                      )}
                    </Link>
                  ))}
                </div>
              </li>
            )}
          </ul>
        </div>

        <ProductMetaReview data={data} />
      </div>
    </div>
  );
};

export default ProductSingleDetails;

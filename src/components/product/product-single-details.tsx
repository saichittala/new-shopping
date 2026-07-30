import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "@components/ui/link";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import isEmpty from "lodash/isEmpty";
import { ProductAttributes } from "./product-attributes";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import { useWindowSize } from "@utils/use-window-size";
import ProductMetaReview from "./product-meta-review";
import useBreadcrumb, { convertBreadcrumbTitle } from "@utils/use-breadcrumb";
import { useTranslation } from "next-i18next";

const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

const ProductSingleDetailsLoader: React.FC = () => {
  return (
    <div className="product-detail animate-pulse">
      {/* Gallery Section */}
      <div className="product-detail__gallery-layout w-full">
        <div className="product-detail__thumbnails-col">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full aspect-[3/4] bg-gray-100 rounded-md"
            />
          ))}
        </div>
        <div className="product-detail__main-preview-col">
          <div className="w-full aspect-[3/4] bg-gray-150 rounded-md" />
          <div className="h-3 w-32 bg-gray-150 rounded mx-auto mt-4" />
        </div>
      </div>

      {/* Info Section */}
      <div className="product-detail__info space-y-6">
        {/* Breadcrumbs */}
        <div className="h-3 w-48 bg-gray-100 rounded" />

        {/* Title */}
        <div className="space-y-2 mt-4">
          <div className="h-8 w-2/3 bg-gray-150 rounded" />
          <div className="h-4 w-1/3 bg-gray-100 rounded" />
        </div>

        {/* Price Wrap */}
        <div className="space-y-1 mt-6">
          <div className="h-6 w-24 bg-gray-150 rounded" />
          <div className="h-3 w-32 bg-gray-100 rounded" />
        </div>

        {/* Sizes Attribute */}
        <div className="space-y-3 mt-6">
          <div className="h-3.5 w-16 bg-gray-150 rounded" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-10 bg-gray-100 rounded border border-gray-200" />
            ))}
          </div>
        </div>

        {/* Colors Attribute */}
        <div className="space-y-3 mt-6">
          <div className="h-3.5 w-16 bg-gray-150 rounded" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-150" />
            ))}
          </div>
        </div>

        {/* Cart Action Row */}
        <div className="flex items-center gap-3 mt-8">
          <div className="w-24 h-12 bg-gray-100 rounded-md" />
          <div className="flex-1 h-12 bg-gray-150 rounded-md" />
        </div>
        <div className="h-3 w-56 bg-gray-100 rounded mx-auto mt-2" />

        {/* Description Lines */}
        <div className="space-y-2 mt-6">
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-4/5 bg-gray-100 rounded" />
        </div>

        {/* Accordions */}
        <div className="border-t border-gray-200 pt-4 space-y-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="h-4 w-32 bg-gray-100 rounded" />
              <div className="h-4 w-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation("common");

  const [zoomOrigin, setZoomOrigin] = useState<string>("center");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const { price, basePrice, discount } = usePrice(
    data && {
      amount: data.sale_price ? data.sale_price : data.price,
      baseAmount: data.price,
      currencyCode: "USD",
    }
  );

  if (isLoading) return <ProductSingleDetailsLoader />;

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
    const colorKey = Object.keys(attribute).find(
      (k) => k.toLowerCase() === "color"
    );
    if (colorKey) {
      const selectedColor = attribute[colorKey];
      const colorList = variations[colorKey];
      if (colorList && Array.isArray(colorList)) {
        const colorIndex = colorList.findIndex(
          (item: any) => item.value === selectedColor
        );
        if (
          colorIndex !== -1 &&
          data?.gallery &&
          colorIndex < data.gallery.length
        ) {
          setActiveImageIdx(colorIndex);
        }
      }
    }
  }

  return (
    <div className="product-detail">
      {/* Gallery */}
      {width < 1025 ? (
        <Carousel
          pagination={{ clickable: true }}
          breakpoints={productGalleryCarouselResponsive}
          className="product-gallery"
          buttonGroupClassName="hidden-element"
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
        <div className="product-detail__gallery-layout">
          {/* Thumbnails Sidebar */}
          <div className="product-detail__thumbnails-col">
            {data?.gallery?.map((item, index: number) => (
              <div
                key={index}
                className={`product-detail__thumbnail ${
                  index === activeImageIdx ? "product-detail__thumbnail--active" : ""
                }`}
                onMouseEnter={() => setActiveImageIdx(index)}
                onClick={() => setActiveImageIdx(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    item?.thumbnail ??
                    "/assets/placeholder/products/product-gallery.svg"
                  }
                  alt={`${data?.name}--thumb-${index}`}
                />
              </div>
            ))}
          </div>

          {/* Main Active Image Preview Column */}
          <div className="product-detail__main-preview-col">
            {/* Main Active Image Preview with floating actions & hover navigation */}
            <div
              className={`product-detail__main-preview ${
                isZoomed ? "product-detail__main-preview--zoomed" : ""
              }`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => {
              setIsZoomed(false);
              setZoomOrigin("center");
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeImageIdx}
              src={
                data?.gallery?.[activeImageIdx]?.original ??
                "/assets/placeholder/products/product-gallery.svg"
              }
              alt={`${data?.name}--preview`}
              style={{
                transformOrigin: zoomOrigin,
                transform: isZoomed ? "scale(2.2)" : "scale(1)",
                transition: isZoomed ? "transform 0.05s ease-out" : "transform 0.2s ease-out",
              }}
            />

            {/* Hover Gallery Arrows */}
            {data?.gallery && data.gallery.length > 1 && (() => {
              const galleryLength = data.gallery.length;
              return (
                <>
                  <button
                    type="button"
                    className="product-detail__preview-arrow product-detail__preview-arrow--left"
                    onClick={() =>
                      setActiveImageIdx((prev) =>
                        prev === 0 ? galleryLength - 1 : prev - 1
                      )
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="product-detail__preview-arrow product-detail__preview-arrow--right"
                    onClick={() =>
                      setActiveImageIdx((prev) =>
                        prev === galleryLength - 1 ? 0 : prev + 1
                      )
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              );
            })()}

            {/* Floating Actions inside Main Preview */}
            <div className="product-detail__preview-actions">
              <button
                type="button"
                className="product-detail__action-btn product-detail__action-btn--transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Elegant hint note to zoom in by hovering */}
          <div className="product-detail__zoom-note">
            Hover image to zoom in
          </div>
        </div>
      </div>
      )}

      {/* Info panel */}
      <div className="product-detail__info">
        {/* Slashed Breadcrumbs */}
        <ul className="product-detail__crumbs">
          <li>
            <Link href="/">{t("breadcrumb-home")}</Link>
          </li>
          {breadcrumbs?.map((breadcrumb: any) => (
            <React.Fragment key={breadcrumb.href}>
              <li>/</li>
              <li>
                <Link href={breadcrumb.href}>
                  {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>

        {/* Header: name */}
        <div className="product-detail__title-row">
          <h2 className="product-detail__name">{data?.name}</h2>
          <button type="button" className="product-detail__favorite-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="product-detail__subtitle">Polo Ralph Lauren</div>

        <div className="product-detail__price-row">
          <div className="product-detail__price-wrap">
            <span className="product-detail__price">{price}</span>
            {discount && (
              <span className="product-detail__original-price">{basePrice}</span>
            )}
          </div>
          <div className="product-detail__tax-disclaimer">MRP, incl. of all taxes</div>
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
            className="product-detail__cart-btn"
            disabled={!isSelected}
            loading={addToCartLoader}
          >
            <span>Add to bag</span>
          </Button>
        </div>
        <div className="product-detail__delivery-note">
          FREE 1-2 day delivery on 5k+ pincodes
        </div>

        <p className="product-detail__description">{data?.description}</p>

        <ProductMetaReview data={data} />
      </div>
    </div>
  );
};

export default ProductSingleDetails;

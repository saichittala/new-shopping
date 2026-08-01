import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "@components/ui/link";
import Button from "@components/ui/button";
import { useProductQuery } from "@framework/product/get-product";
import { getVariations } from "@framework/utils/get-variations";
import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import isEmpty from "lodash/isEmpty";
import { ProductAttributes } from "./product-attributes";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import ProductMetaReview from "./product-meta-review";
import { useUI } from "@contexts/ui.context";
import useBreadcrumb, { convertBreadcrumbTitle } from "@utils/use-breadcrumb";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { useWishlist } from "@contexts/wishlist.context";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";

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
  const { openCart } = useUI();
  const { data, isLoading } = useProductQuery(slug as string);
  const { addItemToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const quantity = 1;
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation("common");
  const [zoomOrigin, setZoomOrigin] = useState<string>("center");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [brokenUrls, setBrokenUrls] = useState<Record<string, boolean>>({});

  const [copied, setCopied] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const shareContainerRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareContainerRef.current && !shareContainerRef.current.contains(event.target as Node)) {
        setShowSharePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageError = (url: string) => {
    if (url) {
      setBrokenUrls((prev) => ({ ...prev, [url]: true }));
    }
  };

  useEffect(() => {
    setActiveImageIdx(0);
    setBrokenUrls({});
  }, [slug]);

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

  const gallery: any[] = [];
  if (data?.image?.original) {
    gallery.push({
      original: data.image.original,
      thumbnail: data.image.thumbnail || data.image.original
    });
  }
  if (data?.gallery && Array.isArray(data.gallery)) {
    data.gallery.forEach((g: any) => {
      if (data.image && (g.original === data.image.original || g.thumbnail === data.image.thumbnail)) return;
      gallery.push({
        original: g.original,
        thumbnail: g.thumbnail || g.original
      });
    });
  }
  if (!isLoading && gallery.length === 0) {
    gallery.push({
      original: "/assets/placeholder/products/no-image.svg",
      thumbnail: "/assets/placeholder/products/no-image.svg"
    });
  }

  const visibleGallery = gallery.filter((item) => !brokenUrls[item.original]);
  const finalGallery = visibleGallery.length > 0 ? visibleGallery : [{
    original: "/assets/placeholder/products/no-image.svg",
    thumbnail: "/assets/placeholder/products/no-image.svg"
  }];
  const hasMultipleImages = finalGallery.length > 1;

  // Adjust active index if it goes out of bounds when filtered
  useEffect(() => {
    if (activeImageIdx >= finalGallery.length) {
      setActiveImageIdx(0);
    }
  }, [finalGallery, activeImageIdx]);

  if (isLoading) return <ProductSingleDetailsLoader />;

  const firstWord = data?.name ? data.name.trim().split(" ")[0] : "Mahara";
  const brandName = ["Armani", "Puma", "Nike", "Adidas", "Fendi", "Zara", "Gucci", "Levis", "H&M"].includes(firstWord)
    ? firstWord
    : "Mahara";

  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://mahara.vercel.app/products/${slug}`;

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
    setTimeout(() => {
      setAddToCartLoader(false);
      openCart();
    }, 600);
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
          finalGallery &&
          colorIndex < finalGallery.length
        ) {
          setActiveImageIdx(colorIndex);
        }
      }
    }
  }

  return (
    <div className="product-detail">
      {/* Mobile/Tablet Gallery */}
      <div className="product-detail__gallery-mobile">
        {hasMultipleImages ? (
          <Carousel
            pagination={{ clickable: true }}
            breakpoints={productGalleryCarouselResponsive}
            className="product-gallery"
            buttonGroupClassName="hidden-element"
          >
            {finalGallery.map((item, index: number) => (
              <SwiperSlide key={`product-gallery-key-${index}`}>
                <div className="product-detail__gallery-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      item?.original ??
                      "/assets/placeholder/products/no-image.svg"
                    }
                    alt={`${data?.name}--${index}`}
                    className="product-detail__gallery-img"
                    onError={() => handleImageError(item.original)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="product-detail__gallery-item w-full flex justify-center py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                finalGallery[0]?.original ??
                "/assets/placeholder/products/no-image.svg"
              }
              alt={`${data?.name}`}
              className="product-detail__gallery-img max-w-full h-auto rounded-lg"
              onError={() => handleImageError(finalGallery[0]?.original)}
            />
          </div>
        )}
      </div>

      {/* Desktop Gallery */}
      <div className="product-detail__gallery-layout product-detail__gallery-desktop">
        {/* Thumbnails Sidebar */}
        {hasMultipleImages && (
          <div className="product-detail__thumbnails-col">
            {finalGallery.map((item, index: number) => (
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
                    "/assets/placeholder/products/no-image.svg"
                  }
                  alt={`${data?.name}--thumb-${index}`}
                  onError={() => handleImageError(item.original)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Main Active Image Preview Column */}
        <div
          ref={shareContainerRef}
          className={cn("product-detail__main-preview-col", {
            "product-detail__main-preview-col--single": !hasMultipleImages
          })}
        >
          {/* Floating Share Button at Top Right of Image Column */}
          <div className="product-detail__image-share-container">
            <button
              type="button"
              className="product-detail__image-share-btn"
              onClick={() => setShowSharePopup(!showSharePopup)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 11C6.07003 11 5.60504 11 5.22354 11.1022C4.18827 11.3796 3.37962 12.1883 3.10222 13.2235C3 13.605 3 14.07 3 15V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V15C21 14.07 21 13.605 20.8978 13.2235C20.6204 12.1883 19.8117 11.3796 18.7765 11.1022C18.395 11 17.93 11 17 11M16 7L12 3M12 3L8 7M12 3V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Share Popup Card */}
            {showSharePopup && (
              <div className="product-detail__share-popup" onClick={(e) => e.stopPropagation()}>
                <h4 className="share-popup__title">Share this product</h4>
                <div className="share-popup__socials">
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={data?.name}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={data?.name}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(data?.name + " - " + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.37 5.054L2 22l5.13-1.346a9.921 9.921 0 0 0 4.881 1.279h.005c5.505 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.927-7.067C17.195 3.012 14.685 2 12.012 2zm5.72 13.916c-.246.697-1.242 1.347-1.782 1.405-.49.053-1.127.094-3.23-.78-2.692-1.12-4.425-3.87-4.56-4.05-.13-.18-1.077-1.44-1.077-2.748 0-1.309.68-1.95.922-2.213.242-.262.532-.328.71-.328.177 0 .355.002.508.01.157.009.37-.06.577.447.214.524.733 1.796.797 1.928.064.13.107.283.02.457-.086.174-.13.282-.258.435-.127.153-.268.34-.383.457-.127.13-.26.27-.113.524.147.254.654 1.085 1.407 1.758.973.87 1.79 1.14 2.046 1.27.256.13.407.11.558-.063.153-.173.655-.764.832-1.025.176-.26.353-.218.595-.127.243.09 1.543.733 1.808.865.266.13.443.197.509.31.066.115.066.666-.18 1.363z"/>
                    </svg>
                  </a>
                </div>
                
                <div className="share-popup__copy-section">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="share-popup__input"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="share-popup__copy-btn"
                  >
                    {copied ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </div>
            )}
          </div>

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
                finalGallery[activeImageIdx]?.original ??
                "/assets/placeholder/products/no-image.svg"
              }
              alt={`${data?.name}--preview`}
              onError={() => handleImageError(finalGallery[activeImageIdx]?.original)}
              style={{
                transformOrigin: zoomOrigin,
                transform: isZoomed ? "scale(2.2)" : "scale(1)",
                transition: isZoomed ? "transform 0.05s ease-out" : "transform 0.2s ease-out",
              }}
            />

            {/* Hover Gallery Arrows */}
            {hasMultipleImages && (() => {
              const galleryLength = finalGallery.length;
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
          </div>
          
          {/* Elegant hint note to zoom in by hovering */}
          <div className="product-detail__zoom-note">
            Hover image to zoom in
          </div>
        </div>
      </div>

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
          <button
            type="button"
            className={cn("product-detail__favorite-btn", {
              "product-detail__favorite-btn--active": data?.id ? isInWishlist(data.id) : false,
            })}
            onClick={() => data && toggleWishlist(data as any)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill={data?.id && isInWishlist(data.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="product-detail__subtitle">{brandName}</div>

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

        {/* Add to Cart */}
        <div className="product-detail__cart-row">
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

        {/* Product specs / tags / categories metadata */}
        <div className="product-detail__meta">
          <ul className="product-detail__meta-list">
            <li>
              <span className="product-detail__meta-label">SKU:</span>
              <span className="product-detail__meta-value">{data?.sku || `MHR-${data?.id || 1083}`}</span>
            </li>
            <li>
              <span className="product-detail__meta-label">Category:</span>
              <Link href={`/category/${data?.category?.slug || "casual-wear"}`} className="product-detail__meta-link">
                {data?.category?.name || "Casual Wear"}
              </Link>
            </li>
            {data?.tags && data.tags.length > 0 && (
              <li>
                <span className="product-detail__meta-label">Tags:</span>
                {data.tags.map((tag: any, idx: number) => (
                  <React.Fragment key={tag.id}>
                    <Link href={`/search?q=${tag.slug}`} className="product-detail__meta-link capitalize">
                      {tag.name}
                    </Link>
                    {idx < (data.tags?.length ?? 0) - 1 && ", "}
                  </React.Fragment>
                ))}
              </li>
            )}
            <li>
              <span className="product-detail__meta-label">Brand:</span>
              <span className="product-detail__meta-value">{brandName}</span>
            </li>
          </ul>
        </div>

        <ProductMetaReview data={data} />
      </div>
    </div>
  );
};

export default ProductSingleDetails;

import React from "react";
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { Product } from "@framework/types";
import Alert from "@components/ui/alert";
import cn from "classnames";

interface ProductsProps {
  sectionHeading?: any;
  categorySlug?: string;
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;
  variant?:
    | "circle"
    | "rounded"
    | "listSmall"
    | "grid"
    | "gridSlim"
    | "list"
    | "gridModern"
    | "gridModernWide"
    | "gridTrendy"
    | "luxury"
    | undefined;
  limit?: number;
  imgWidth?: number | string;
  imgHeight?: number | string;
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const ProductsBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = "products-block",
  products,
  loading,
  error,
  uniqueKey,
  variant = "grid",
  limit = 10,
  imgWidth,
  imgHeight,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  return (
    <div className={className}>
      {sectionHeading && (
        <SectionHeader
          sectionHeading={sectionHeading}
          categorySlug={categorySlug}
        />
      )}

      {error ? (
        <Alert message={error} />
      ) : (
        <div
          className={cn(
            "products-grid",
            {
              "products-grid--grid": variant === "grid",
              "products-grid--gridModernWide": variant === "gridModernWide",
              "products-grid--gridModern": variant === "gridModern",
              "products-grid--gridTrendy": variant === "gridTrendy",
              "products-grid--gridSlim": variant === "gridSlim",
              "products-grid--luxury": variant === "luxury",
              "products-grid--ancient": demoVariant === "ancient",
            }
          )}
        >
          {loading && !products?.length ? (
            <ProductFeedLoader limit={limit} uniqueKey={uniqueKey} />
          ) : (
            products?.map((product: Product) => (
              <ProductCard
                showCategory={showCategory}
                showRating={showRating}
                hideProductDescription={hideProductDescription}
                key={`product--key${product.id}`}
                product={product}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                variant={variant}
                demoVariant={demoVariant}
                disableBorderRadius={disableBorderRadius}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsBlock;


import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import { useProductsQuery } from "@framework/product/get-all-products";
import { useRouter } from "next/router";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { Product } from "@framework/types";

interface ProductGridProps {
  className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: 10, ...query });
  const { t } = useTranslation("common");
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className={`search-product-grid ${className}`}>
        {isLoading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          data?.pages?.map((page) => {
            return page?.data?.map((product: Product) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                variant="gridModern"
                imgWidth={344}
                imgHeight={344}
              />
            ));
          })
        )}
      </div>
      <div className="product-grid__load-more">
        {hasNextPage && (
          <Button
            isLoading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            color="secondary"
            size="md"
          >
            {t("button-load-more")}
          </Button>
        )}
      </div>
    </>
  );
};

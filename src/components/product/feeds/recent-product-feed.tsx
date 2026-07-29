import SectionHeader from "@components/common/section-header";
import ProductsBlock from "@containers/products-block";
import { useProductsQuery } from "@framework/product/get-all-products-2";

export default function RecentProductFeed() {
  const { data, isLoading, error } = useProductsQuery({ limit: 10 });

  return (
    <div className="trending-feed">
      <SectionHeader sectionHeading="text-recently-view-products" className="" />
      <ProductsBlock
        products={data?.slice(2, 7)}
        loading={isLoading}
        error={error?.message}
        uniqueKey="recently-viewed"
        variant="gridModern"
        imgWidth={344}
        imgHeight={344}
      />
    </div>
  );
}

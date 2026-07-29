import SectionHeader from "@components/common/section-header";
import ProductsBlock from "@containers/products-block";
import { useProductsQuery } from "@framework/product/get-all-products-2";

const TrendingProductFeedWithTabs: React.FC<any> = () => {
  const { data, isLoading, error } = useProductsQuery({
    limit: 10,
  });

  return (
    <div className="trending-feed">
      <SectionHeader
        sectionHeading="text-trending-products"
        className=""
      />

      <ProductsBlock
        products={data?.slice(0, 10)}
        loading={isLoading}
        error={error?.message}
        uniqueKey="trending-products"
        variant="gridModern"
        imgWidth={344}
        imgHeight={344}
      />
    </div>
  );
};

export default TrendingProductFeedWithTabs;
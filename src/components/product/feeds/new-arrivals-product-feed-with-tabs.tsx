import SectionHeader from "@components/common/section-header";
import ProductsBlock from "@containers/products-block";
import { useProductsQuery } from "@framework/product/get-all-products-2";

const NewArrivalsProductFeedWithTabs: React.FC<any> = () => {
  const { data, isLoading, error } = useProductsQuery({
    limit: 10,
  });

  return (
    <div className="new-arrivals-feed">
      <SectionHeader
        sectionHeading="text-new-arrivals"
        className=""
      />

      <ProductsBlock
        products={data?.slice(0, 8)}
        loading={isLoading}
        error={error?.message}
        uniqueKey="new-arrivals"
        variant="gridModernWide"
        imgWidth={435}
        imgHeight={435}
      />
    </div>
  );
};

export default NewArrivalsProductFeedWithTabs;


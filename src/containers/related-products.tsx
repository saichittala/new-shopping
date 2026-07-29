import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useRelatedProductsQuery } from "@framework/product/get-related-product";
import Alert from "@components/ui/alert";

interface ProductsProps {
	sectionHeading: string;
	className?: string;
}

const RelatedProducts: React.FC<ProductsProps> = ({
	sectionHeading,
	className = "related-products",
}) => {
	const { data, isLoading, error } = useRelatedProductsQuery({
		limit: 10,
	});

	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<div className="products-grid products-grid--grid">
				{error ? (
					<div className="products-grid__col-span-full">
						<Alert message={error?.message} />
					</div>
				) : isLoading ? (
					<ProductFeedLoader limit={5} uniqueKey="related-product" />
				) : (
					data?.map((product: any) => (
						<ProductCard
							key={`product--key${product.id}`}
							product={product}
							imgWidth={340}
							imgHeight={440}
							variant="grid"
						/>
					))
				)}
			</div>
		</div>
	);
};

export default RelatedProducts;

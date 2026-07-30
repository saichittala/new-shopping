import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";

interface Props {
	data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
	const [expanded, setExpanded] = useState<number>(0);
	const metaData = data?.meta || [
		{
			id: 1,
			title: "Product Details",
			content: data?.description || "High quality product from our premium collections. Designed for ultimate comfort and modern style."
		},
		{
			id: 2,
			title: "Additional Information",
			content: "Free standard shipping on orders over ₹1000. Delivered in 3-5 business days."
		},
		{
			id: 3,
			title: "Customer Reviews",
			content: "Share your thoughts with other customers by writing a review."
		}
	];

	return (
		<>
			{metaData?.map((item: any, index: any) => (
				<Collapse
					i={index}
					key={item.title}
					title={item.title}
					translatorNS="review"
					content={
						metaData.length === item.id ? (
							<div className="product-meta-review__content">
								<p className="product-meta-review__text">{item.content}</p>
								<ReviewForm />
							</div>
						) : (
							<p className="product-meta-review__text">{item.content}</p>
						)
					}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
};

export default ProductMetaReview;

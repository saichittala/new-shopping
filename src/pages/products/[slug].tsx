import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import i18nConfig from "../../../next-i18next.config";

export default function ProductPage() {
	return (
		<>
			<Divider className="product-page-divider" />
			<Container>
				<div className="product-page-content-wrapper">
					<ProductSingleDetails />
					<RelatedProducts sectionHeading="text-related-products" />
					<Subscription />
				</div>
			</Container>
		</>
	);
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			], i18nConfig)),
		},
	};
};

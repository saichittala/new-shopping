import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import OrderDetails from "@components/order/order-details";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18nConfig from "../../../../next-i18next.config";

export default function OrderPage() {
	return (
		<AccountLayout>
			<OrderDetails />
		</AccountLayout>
	);
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			], i18nConfig as any)),
		},
	};
};

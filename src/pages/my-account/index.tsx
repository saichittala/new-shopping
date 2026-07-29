import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

export default function AccountPage() {
    const { t } = useTranslation("common");
    return (
        <AccountLayout>
            <h2 className="account-dashboard__title">
                {t("text-dashboard")}
            </h2>
            <p className="account-dashboard__welcome">
                {t("text-account-dashboard")}{" "}
                <Link
                    href={ROUTES.ORDERS}
                    className="account-dashboard__welcome-link"
                >
                    {t("text-recent-orders")}
                </Link>
                , {t("text-manage-your")}{" "}
                <Link
                    href={ROUTES.ACCOUNT_DETAILS}
                    className="account-dashboard__welcome-link"
                >
                    {t("text-account-details")}
                </Link>{" "}
                {t("text-and")}{" "}
                <Link
                    href={ROUTES.CHANGE_PASSWORD}
                    className="account-dashboard__welcome-link"
                >
                    {t("text-change-your-password")}
                </Link>
                .
            </p>
        </AccountLayout>
    );
}

AccountPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
    };
};

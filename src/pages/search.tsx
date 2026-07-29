import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import ShopDiscount from "@components/shop/discount";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

import { useState } from "react";

export default function Shop() {
  const { t } = useTranslation("common");
  const [gridCols, setGridCols] = useState(3);

  return (
    <>
      <ShopDiscount />
      <Container>
        <div className="search-page">
          {/* Sidebar */}
          <div className="search-page__sidebar">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="search-page__breadcrumb">
                <BreadcrumbItems separator="/">
                  <ActiveLink
                    href={"/"}
                    activeClassName="breadcrumb__link--active"
                  >
                    {t("breadcrumb-home")}
                  </ActiveLink>
                  <ActiveLink
                    href={ROUTES.SEARCH}
                    activeClassName="breadcrumb__link--active"
                  >
                    {t("breadcrumb-search")}
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
              <ShopFilters />
            </StickyBox>
          </div>

          {/* Main content */}
          <div className="search-page__content">
            <SearchTopBar gridCols={gridCols} setGridCols={setGridCols} />
            <ProductGrid gridCols={gridCols} />
          </div>
        </div>
      </Container>
    </>
  );
}

Shop.Layout = Layout;

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

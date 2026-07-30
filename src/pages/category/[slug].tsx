import { useState } from "react";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import i18nConfig from "../../../next-i18next.config";
import { useRouter } from "next/router";
import Breadcrumb from "@components/common/breadcrumb";
import ListBox from "@components/ui/list-box";
import { useProductsQuery } from "@framework/product/get-all-products";

const Grid3Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="4" height="18" rx="0.5" />
    <rect x="10" y="3" width="4" height="18" rx="0.5" />
    <rect x="17" y="3" width="4" height="18" rx="0.5" />
  </svg>
);

const Grid4Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="3" height="18" rx="0.5" />
    <rect x="7.5" y="3" width="3" height="18" rx="0.5" />
    <rect x="13.5" y="3" width="3" height="18" rx="0.5" />
    <rect x="19" y="3" width="3" height="18" rx="0.5" />
  </svg>
);

const Grid5Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="2" height="18" rx="0.5" />
    <rect x="6.5" y="3" width="2" height="18" rx="0.5" />
    <rect x="11" y="3" width="2" height="18" rx="0.5" />
    <rect x="15.5" y="3" width="2" height="18" rx="0.5" />
    <rect x="20" y="3" width="2" height="18" rx="0.5" />
  </svg>
);

export default function Category() {
  const { query } = useRouter();
  const [gridCols, setGridCols] = useState(3);
  const { data } = useProductsQuery({ limit: 10, ...query });

  const categoryTitle = query.slug?.toString().split("-").join(" ");

  const totalItems = data?.pages?.[0]?.data?.length ? 20 : 0;

  return (
    <div className="category-page">
      <Container>
        {/* Breadcrumbs */}
        <div className="category-page__breadcrumbs">
          <Breadcrumb />
        </div>

        {/* Title, Count & Controls Row */}
        <div className="category-page__header">
          {/* Left: Heading + count inline */}
          <div className="category-page__title-wrap">
            <h1 className="category-page__title">
              {categoryTitle}
              <span className="category-page__count">
                {totalItems}
              </span>
            </h1>
          </div>

          {/* Right: toggle controls & sorting */}
          <div className="category-page__controls">
            {/* Grid Toggle Switcher */}
            <div className="category-page__grid-switcher">
              <span className="category-page__grid-label">
                Grid
              </span>
              <div className="category-page__grid-container">
                {[
                  { cols: 3, label: "3 Cols", icon: <Grid3Icon /> },
                  { cols: 4, label: "4 Cols", icon: <Grid4Icon /> },
                  { cols: 5, label: "5 Cols", icon: <Grid5Icon /> },
                ].map((opt) => (
                  <button
                    key={opt.cols}
                    onClick={() => setGridCols(opt.cols)}
                    className={`category-page__grid-btn ${
                      gridCols === opt.cols
                        ? "category-page__grid-btn--active"
                        : "category-page__grid-btn--inactive"
                    }`}
                    aria-label={`${opt.label} grid`}
                  >
                    {opt.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting listbox */}
            <div className="category-page__sort">
              <ListBox
                className="category-page__sort-box"
                options={[
                  { name: "text-sorting-options", value: "options" },
                  { name: "text-newest", value: "newest" },
                  { name: "text-popularity", value: "popularity" },
                  { name: "text-price-low-high", value: "low-high" },
                  { name: "text-price-high-low", value: "high-low" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="category-page__content">
          <ProductGrid gridCols={gridCols} />
        </div>
        <Subscription />
      </Container>
    </div>
  );
}

Category.Layout = Layout;

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

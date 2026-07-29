import type { GetStaticProps } from 'next';
import Container from '@components/ui/container';
import HeroBanner from '@containers/hero-banner';
import Layout from '@components/layout/layout';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchFlashSaleProducts } from '@framework/product/get-all-flash-sale-products';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchNewArrivalProducts } from '@framework/product/get-all-new-arrival-products';
import { fetchBrands } from '@framework/brand/get-all-brands';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CategoryBlockIcon from '@containers/category-block-icon';
import { ROUTES } from '@utils/routes';
import {
  homeSevenBanner as banner,
  contemporaryBanner1,
  contemporaryBanner2,
} from '@framework/static/banner';
import NewArrivalsProductFeedWithTabs from '@components/product/feeds/new-arrivals-product-feed-with-tabs';
import BannerCard from '@components/common/banner-card';
import TrendingProductFeedWithTabs from '@components/product/feeds/trending-product-feed-with-tabs';
import RecentProductFeed from '@components/product/feeds/recent-product-feed';



export default function Home() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <HeroBanner />

      {/* ── Browse by Category ── */}
      <Container className="categories-section">
        <CategoryBlockIcon
          sectionHeading="text-browse-categories"
          variant="luxury"
        />
      </Container>

      {/* ── New Arrivals ── */}
      <Container>
        <NewArrivalsProductFeedWithTabs />
      </Container>

      {/* ── Inner content sections ── */}
      <Container>
        <BannerCard
          key={`banner--key${banner.id}`}
          banner={contemporaryBanner1}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className="banner-card"
        />
        <TrendingProductFeedWithTabs />
        <BannerCard
          key={`banner--key1${banner.id}`}
          banner={contemporaryBanner2}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className="banner-card"
        />
        <RecentProductFeed />
      </Container>
    </>
  );
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS, { limit: 10 }],
    queryFn: fetchFlashSaleProducts
  });
  await queryClient.prefetchQuery({
    queryKey: [API_ENDPOINTS.CATEGORIES, { limit: 10 }],
    queryFn: fetchCategories
  });
  await queryClient.prefetchQuery({
    queryKey: [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, { limit: 10 }],
    queryFn: fetchNewArrivalProducts
  });
  await queryClient.prefetchQuery({
    queryKey: [API_ENDPOINTS.BRANDS, { limit: 0 }],
    queryFn: fetchBrands
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};

import SectionHeader from "@components/common/section-header";
import ProductsBlock from "@containers/products-block";
import { useTranslation } from "next-i18next";
import { useProductsQuery } from "@framework/product/get-all-products-2";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const TrendingProductFeedWithTabs: React.FC<any> = () => {
  const { t } = useTranslation("common");

  const { data, isLoading, error } = useProductsQuery({
    limit: 10,
  });

  return (
    <div className="trending-feed">
      <SectionHeader
        sectionHeading="text-trending-products"
        className=""
      />

      <TabGroup as="div">
        <TabList as="ul" className="tab-ul">
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p>{t("tab-all-collection")}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p>{t("tab-flash-sale")}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p>{t("tab-best-sellers")}</p>
          </Tab>
          <Tab
            as="li"
            className={({ selected }) =>
              selected ? "tab-li-selected" : "tab-li"
            }
          >
            <p>{t("tab-featured")}</p>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(0, 10)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="trending-products"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(5, 15)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="trending-products"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(12, 22)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="trending-products"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
          <TabPanel>
            <ProductsBlock
              products={data?.slice(8, 18)}
              loading={isLoading}
              error={error?.message}
              uniqueKey="trending-products"
              variant="gridModern"
              imgWidth={344}
              imgHeight={344}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TrendingProductFeedWithTabs;
import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";

export default function SearchTopBar() {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div className="search-topbar">
      <h1 className="search-topbar__title">{t("text-casual-wear")}</h1>

      {/* Mobile filter trigger */}
      <button
        className="search-topbar__mobile-filter-btn"
        onClick={openFilter}
        aria-label="Open filters"
      >
        <FilterIcon />
        <span>{t("text-filters")}</span>
      </button>

      {/* Right: count + sort */}
      <div className="search-topbar__right">
        <span className="search-topbar__count">9,608 {t("text-items")}</span>
        <ListBox
          options={[
            { name: "text-sorting-options", value: "options" },
            { name: "text-newest", value: "newest" },
            { name: "text-popularity", value: "popularity" },
            { name: "text-price-low-high", value: "low-high" },
            { name: "text-price-high-low", value: "high-low" },
          ]}
        />
      </div>

      {/* Mobile filter drawer */}
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displayFilter}
        onClose={closeFilter}
        {...motionProps}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}

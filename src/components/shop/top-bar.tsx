import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";

interface SearchTopBarProps {
  gridCols?: number;
  setGridCols?: (cols: number) => void;
}

export default function SearchTopBar({ gridCols = 3, setGridCols }: SearchTopBarProps) {
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
        {/* Toggle buttons */}
        {setGridCols && (
          <div className="hidden md:flex items-center gap-1.5 ltr:mr-4 rtl:ml-4 ltr:lg:mr-6 rtl:lg:ml-6">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 border rounded-md transition-all duration-150 focus:outline-none ${
                gridCols === 3
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-transparent text-gray-400 hover:text-black hover:border-gray-400"
              }`}
              aria-label="3 columns grid"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="4" height="18" rx="0.5" fill="currentColor" />
                <rect x="10" y="3" width="4" height="18" rx="0.5" fill="currentColor" />
                <rect x="17" y="3" width="4" height="18" rx="0.5" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => setGridCols(5)}
              className={`p-1.5 border rounded-md transition-all duration-150 focus:outline-none ${
                gridCols === 5
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-transparent text-gray-400 hover:text-black hover:border-gray-400"
              }`}
              aria-label="5 columns grid"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="2.5" height="18" rx="0.5" fill="currentColor" />
                <rect x="6.5" y="3" width="2.5" height="18" rx="0.5" fill="currentColor" />
                <rect x="11" y="3" width="2.5" height="18" rx="0.5" fill="currentColor" />
                <rect x="15.5" y="3" width="2.5" height="18" rx="0.5" fill="currentColor" />
                <rect x="20" y="3" width="2.5" height="18" rx="0.5" fill="currentColor" />
              </svg>
            </button>
          </div>
        )}

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

import React from "react";
import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";

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
          <div className="hidden md:flex items-center gap-2 ltr:mr-4 rtl:ml-4 ltr:lg:mr-6 rtl:lg:ml-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none">
              Grid
            </span>
            <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-150 gap-0.5">
              {[
                { cols: 3, label: "3 Cols", icon: <Grid3Icon /> },
                { cols: 4, label: "4 Cols", icon: <Grid4Icon /> },
                { cols: 5, label: "5 Cols", icon: <Grid5Icon /> },
              ].map((opt) => (
                <button
                  key={opt.cols}
                  onClick={() => setGridCols(opt.cols)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 flex items-center gap-1.5 focus:outline-none ${
                    gridCols === opt.cols
                      ? "bg-white text-gray-900 border border-gray-200 shadow-xs"
                      : "bg-transparent text-gray-400 hover:text-gray-900 border border-transparent"
                  }`}
                  aria-label={`${opt.label} grid`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
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

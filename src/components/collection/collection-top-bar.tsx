import React from "react";
import { Drawer } from "@components/common/drawer/drawer";
import { MdCollectionsBookmark } from "react-icons/md";
import Text from "@components/ui/text";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import CollectionFilterSidebar from "./collection-filter-sidebar";
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

interface CollectionTopBarProps {
  gridCols?: number;
  setGridCols?: (cols: number) => void;
}

const CollectionTopBar: React.FC<CollectionTopBarProps> = ({ gridCols = 3, setGridCols }) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation("common");
  const {
    locale,
    query: { slug },
  } = useRouter();

  const collectionTitle = slug?.toString().split("-").join(" ");
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
  return (
    <div className="flex justify-between items-center mb-7">
      <Text
        variant="pageHeading"
        className="hidden lg:inline-flex pb-1 capitalize"
      >
        {collectionTitle}
      </Text>
      <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={openFilter}
      >
        <MdCollectionsBookmark className="text-lg" />
        <span className="ltr:pl-2 rtl:pr-2">{t("text-filters")}</span>
      </button>
      <div className="flex items-center justify-end">
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

        <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4">
          9,608 {t("text-items")}
        </div>
      </div>
      {/* TODO: need to use just one drawer component */}
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displayFilter}
        onClose={closeFilter}
        styles={{
          wrapper: contentWrapperCSS,
        }}
        {...motionProps}
      >
        <CollectionFilterSidebar />
      </Drawer>
    </div>
  );
};

export default CollectionTopBar;

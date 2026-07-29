import { Drawer } from "@components/common/drawer/drawer";
import { MdCollectionsBookmark } from "react-icons/md";
import Text from "@components/ui/text";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import CollectionFilterSidebar from "./collection-filter-sidebar";
import motionProps from "@components/common/drawer/motion";

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

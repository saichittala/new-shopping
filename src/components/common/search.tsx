import React, { useRef, useEffect } from "react";
import cn from "classnames";
import SearchResultLoader from "@components/ui/loaders/search-result-loader";
import { useUI } from "@contexts/ui.context";
import SearchBox from "@components/common/search-box";
import { useSearchQuery } from "@framework/product/use-search";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Scrollbar from "@components/common/scrollbar";
import SearchProduct from "@components/common/search-product";
import { IoTimeOutline, IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const DEFAULT_RECENT_SEARCHES = [
  "mobiles",
  "asus laptop",
  "realme buds 3",
  "jbl earbuds wired",
  "lg qned evo ai 65 inch"
];

const trendingSearches = [
  "shoes",
  "t shirts",
  "laptops",
  "watches",
  "tv"
];

export default function Search() {
  const router = useRouter();
  const { displaySearch, closeSearch } = useUI();
  const [searchText, setSearchText] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [recents, setRecents] = React.useState<string[]>([]);
  const { data, isLoading } = useSearchQuery({
    text: searchText,
  });

  useEffect(() => {
    const stored = localStorage.getItem("mahara-recent-searches");
    if (stored) {
      try {
        setRecents(JSON.parse(stored));
      } catch (e) {
        setRecents(DEFAULT_RECENT_SEARCHES);
      }
    } else {
      setRecents(DEFAULT_RECENT_SEARCHES);
    }
  }, [displaySearch]);

  const saveSearchQuery = (query: string) => {
    if (!query || !query.trim()) return;
    const trimmed = query.trim().toLowerCase();
    setRecents((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed);
      const updated = [trimmed, ...filtered].slice(0, 5);
      localStorage.setItem("mahara-recent-searches", JSON.stringify(updated));
      return updated;
    });
  };

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
    if (searchText.trim()) {
      saveSearchQuery(searchText);
      router.push(`/search?q=${encodeURIComponent(searchText)}`);
      closeSearch();
    }
  }
  function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
    setSearchText(e.currentTarget.value);
  }
  function clear() {
    setSearchText("");
  }
  function selectSuggestion(val: string) {
    saveSearchQuery(val);
    setSearchText(val);
    router.push(`/search?q=${encodeURIComponent(val)}`);
    closeSearch();
  }

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (displaySearch) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [displaySearch]);

  return (
    <div ref={ref}>
      <div
        className={cn("overlay", {
          open: displaySearch,
        })}
        role="button"
        onClick={closeSearch}
      />
      <div
        className={cn(
          "drawer-search fixed top-0 z-50 transition duration-300 ease-in-out left-1/2 -translate-x-1/2 px-4 w-full md:w-[730px] lg:w-[930px]",
          displaySearch ? "opacity-100 visible open" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="w-full flex flex-col justify-center">
          <div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
            <div className="flex flex-col mx-auto mb-1.5 w-full ">
              <SearchBox
                onSubmit={handleSearch}
                onChange={handleAutoSearch}
                name="search"
                value={searchText}
                onClear={clear}
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Search for Products, Brands and More"
              />
            </div>
            {(isFocused || searchText) && (
              <div className="search-dropdown-ds">
                {searchText ? (
                  <div className="bg-white flex flex-col overflow-hidden h-full max-h-64vh lg:max-h-[550px]">
                    <Scrollbar className="os-host-flexbox">
                      <div className="h-full">
                        {isLoading ? (
                          <div className="p-5 border-b border-gray-300 border-opacity-30 last:border-b-0">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <SearchResultLoader
                                key={idx}
                                uniqueKey={`top-search-${idx}`}
                              />
                            ))}
                          </div>
                        ) : (
                          data?.map((item: any, index: number) => (
                            <div
                              key={item.key}
                              className=" p-5 border-b border-gray-150 relative last:border-b-0 cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                saveSearchQuery(searchText);
                                closeSearch();
                                router.push(`/products/${item.slug}`);
                              }}
                            >
                              <SearchProduct item={item} key={index} />
                            </div>
                          ))
                        )}
                      </div>
                    </Scrollbar>
                  </div>
                ) : (
                  <div className="search-dropdown-ds__suggestions">
                    <div className="search-dropdown-ds__section">
                      {recents.map((item) => (
                        <div
                          key={item}
                          className="search-dropdown-ds__item"
                          onMouseDown={() => selectSuggestion(item)}
                        >
                          <IoTimeOutline className="search-dropdown-ds__item-icon" />
                          <span className="search-dropdown-ds__item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="search-dropdown-ds__section">
                      <div className="search-dropdown-ds__section-title">Trending</div>
                      {trendingSearches.map((item) => (
                        <div
                          key={item}
                          className="search-dropdown-ds__item"
                          onMouseDown={() => selectSuggestion(item)}
                        >
                          <IoSearchOutline className="search-dropdown-ds__item-icon" />
                          <span className="search-dropdown-ds__item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import SearchIcon from "@components/icons/search-icon";
import React from "react";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { IoCloseOutline } from "react-icons/io5";

type SearchProps = {
  className?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
};

const SearchBox = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSubmit, onClear, placeholder, ...rest }, ref) => {
    const { t } = useTranslation("forms");
    return (
      <form
        className={cn("search-box-ds", className)}
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label htmlFor="search" className="search-box-ds__label">
          <span className="search-box-ds__icon-container">
            <SearchIcon color="currentColor" className="w-4 h-4" />
          </span>
          <input
            id="search"
            className="search-box-ds__input"
            placeholder={placeholder || t("placeholder-search")}
            aria-label="Search"
            autoComplete="off"
            ref={ref}
            {...rest}
          />
        </label>
        {rest.value && (
          <button
            type="button"
            className="search-box-ds__clear-btn"
            onClick={onClear}
          >
            <IoCloseOutline className="w-5 h-5" />
          </button>
        )}
      </form>
    );
  }
);

SearchBox.displayName = "SearchBox";
export default SearchBox;

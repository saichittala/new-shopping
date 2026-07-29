import { CheckBox } from "@components/ui/checkbox";
import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const BrandFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const { data, isLoading, error } = useBrandsQuery({ limit: 10 });
  const [isOpen, setIsOpen] = React.useState(true);

  const selectedBrands = query?.brand ? (query.brand as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedBrands);

  React.useEffect(() => {
    setFormState(selectedBrands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.brand]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { brand, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(currentFormState.length ? { brand: currentFormState.join(",") } : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  const items = data?.brands;

  return (
    <div className="filter-accordion">
      <button
        className="filter-accordion__header"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
      >
        <span className="filter-accordion__title">{t("text-brands")}</span>
        <span className="filter-accordion__icon" aria-hidden="true">
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>

      <div className={`filter-accordion__body${isOpen ? " filter-accordion__body--open" : ""}`}>
        {isLoading ? (
          <p className="filter-accordion__loading">Loading…</p>
        ) : error ? (
          <p className="filter-accordion__error">{error.message}</p>
        ) : (
          <div className="filter-checkbox-list">
            {items?.map((item: any) => (
              <CheckBox
                key={item.id}
                label={item.name}
                name={item.name.toLowerCase()}
                checked={formState.includes(item.slug)}
                value={item.slug}
                onChange={handleItemClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

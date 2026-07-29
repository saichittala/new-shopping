import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const CategoryFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const { data, isLoading } = useCategoriesQuery({ limit: 10 });
  const [isOpen, setIsOpen] = React.useState(true);

  const selectedCategories = query?.category
    ? (query.category as string).split(",")
    : [];
  const [formState, setFormState] = React.useState<string[]>(selectedCategories);

  React.useEffect(() => {
    setFormState(selectedCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.category]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { category, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(currentFormState.length ? { category: currentFormState.join(",") } : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  const items = data?.categories.data;

  return (
    <div className="filter-accordion">
      <button
        className="filter-accordion__header"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
      >
        <span className="filter-accordion__title">{t("text-category")}</span>
        <span className="filter-accordion__icon" aria-hidden="true">
          {isOpen ? (
            /* Minus icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Plus icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>

      <div className={`filter-accordion__body${isOpen ? " filter-accordion__body--open" : ""}`}>
        {isLoading ? (
          <p className="filter-accordion__loading">Loading…</p>
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

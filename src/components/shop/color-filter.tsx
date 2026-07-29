import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

const colorFilterItems = [
  { id: "1", name: "Black",  slug: "black",  hexColor: "#000000" },
  { id: "2", name: "Blue",   slug: "blue",   hexColor: "#3310ce" },
  { id: "3", name: "Olive",  slug: "olive",  hexColor: "#0c7448" },
  { id: "4", name: "Maroon", slug: "maroon", hexColor: "#5f0e0e" },
  { id: "5", name: "Brown",  slug: "brown",  hexColor: "#362727" },
  { id: "6", name: "White",  slug: "white",  hexColor: "#ffffff" },
  { id: "7", name: "Gray",   slug: "gray",   hexColor: "#e1e1e1" },
];

export const ColorFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const [isOpen, setIsOpen] = React.useState(true);

  const selectedColors = query?.color ? (query.color as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedColors);

  React.useEffect(() => {
    setFormState(selectedColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.color]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { color, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(currentFormState.length ? { color: currentFormState.join(",") } : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <div className="filter-accordion">
      <button
        className="filter-accordion__header"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
      >
        <span className="filter-accordion__title">{t("text-colors")}</span>
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
        <div className="filter-checkbox-list">
          {colorFilterItems.map((item) => (
            <CheckBox
              key={item.id}
              label={
                <span className="filter-color-option">
                  <span
                    className="filter-color-swatch"
                    style={{ backgroundColor: item.hexColor }}
                    aria-hidden="true"
                  />
                  {item.name}
                </span>
              }
              name={item.name.toLowerCase()}
              checked={formState.includes(item.slug)}
              value={item.slug}
              onChange={handleItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

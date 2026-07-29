import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

const priceFilterItems = [
  { id: "1", name: "Under $50",       slug: "0-50"      },
  { id: "2", name: "$50 to $100",     slug: "50-100"    },
  { id: "3", name: "$100 to $150",    slug: "100-150"   },
  { id: "4", name: "$150 to $200",    slug: "150-200"   },
  { id: "5", name: "$200 to $300",    slug: "200-300"   },
  { id: "6", name: "$300 to $500",    slug: "300-500"   },
  { id: "7", name: "$500 to $1000",   slug: "500-1000"  },
  { id: "8", name: "Over $1000",      slug: "1000-"     },
];

export const PriceFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const [isOpen, setIsOpen] = React.useState(true);

  const selectedPrices = query?.price ? (query.price as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedPrices);

  React.useEffect(() => {
    setFormState(selectedPrices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.price]);

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    const currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { price, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(currentFormState.length ? { price: currentFormState.join(",") } : {}),
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
        <span className="filter-accordion__title">{t("text-price")}</span>
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
          {priceFilterItems.map((item) => (
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
      </div>
    </div>
  );
};

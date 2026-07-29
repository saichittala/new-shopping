import { CategoryFilter } from "./category-filter";
import { BrandFilter } from "./brand-filter";
import { FilteredItem } from "./filtered-item";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";

export const ShopFilters: React.FC = () => {
	const router = useRouter();
	const { pathname, query } = router;
	const { t } = useTranslation("common");

	return (
		<div className="shop-filters">
			{/* Header: Filters title + Clear All */}
			<div className="filter-header">
				<h2 className="filter-header__title">{t("text-filters")}</h2>
				<button
					className="filter-header__clear-btn"
					aria-label="Clear All filters"
					onClick={() => router.push(pathname)}
				>
					{t("text-clear-all")}
				</button>
			</div>

			{/* Active filter tags */}
			{!isEmpty(query) && (
				<div className="filter-active-tags">
					{Object.values(query)
						.join(",")
						.split(",")
						.map((v, idx) => (
							<FilteredItem
								itemKey={Object.keys(query).find((k) => query[k]?.includes(v))!}
								itemValue={v}
								key={idx}
							/>
						))}
				</div>
			)}

			<CategoryFilter />
			<BrandFilter />
			<PriceFilter />
			<ColorFilter />
		</div>
	);
};

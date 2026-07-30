import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchProduct = async (slug: string) => {
	// Try fetching from standard products lists to find the clicked slug
	const endpoints = [
		API_ENDPOINTS.PRODUCTS,
		API_ENDPOINTS.PRODUCTS_2,
		API_ENDPOINTS.PRODUCTS_ANCIENT,
		API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS,
		API_ENDPOINTS.BEST_SELLER_PRODUCTS,
		API_ENDPOINTS.TOP_SELLER_PRODUCTS,
		API_ENDPOINTS.FLASH_SALE_PRODUCTS,
		API_ENDPOINTS.POPULAR_PRODUCTS
	];

	for (const endpoint of endpoints) {
		try {
			const { data } = await http.get(endpoint);
			if (Array.isArray(data)) {
				const found = data.find((p: any) => p.slug === slug);
				if (found) return found;
			}
		} catch (err) {
			// Fail-silent, try next endpoint
		}
	}

	// Fallback: fetch default product layout and dynamically update its title and slug
	const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}`);
	if (data) {
		return {
			...data,
			slug,
			name: slug
				.split(/[-_]+/)
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ")
		};
	}
	return data;
};

export const useProductQuery = (slug: string) => {
	return useQuery<Product, Error>({
		queryKey: [API_ENDPOINTS.PRODUCT, slug],
		queryFn: () => fetchProduct(slug)
	});
};

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export function usePageTitle() {
	const { pathname, query } = useRouter();
	const { t } = useTranslation('common');

	const formatWord = (str: string) => {
		return str
			.split(/[-_]+/)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	// Home / Layout variations
	if (
		pathname === '/' ||
		pathname === '/standard' ||
		pathname === '/classic' ||
		pathname === '/minimal' ||
		pathname === '/modern' ||
		pathname === '/vintage' ||
		pathname === '/ancient' ||
		pathname === '/trendy' ||
		pathname === '/elegant' ||
		pathname === '/refined' ||
		pathname === '/contemporary'
	) {
		return 'Home | Mahara';
	}

	// Dynamic routes: category, collection, product details, shop details, order details
	if (pathname.includes('/category/[slug]')) {
		const slug = query.slug?.toString() || '';
		return slug ? `${formatWord(slug)} | Mahara` : 'Category | Mahara';
	}
	if (pathname.includes('/collections/[slug]')) {
		const slug = query.slug?.toString() || '';
		return slug ? `${formatWord(slug)} | Mahara` : 'Collection | Mahara';
	}
	if (pathname.includes('/products/[slug]')) {
		const slug = query.slug?.toString() || '';
		return slug ? `${formatWord(slug)} | Mahara` : 'Product Details | Mahara';
	}
	if (pathname.includes('/shops/[slug]')) {
		const slug = query.slug?.toString() || '';
		return slug ? `${formatWord(slug)} | Mahara` : 'Shop | Mahara';
	}
	if (pathname.includes('/my-account/orders/[id]')) {
		const id = query.id?.toString() || '';
		return id ? `Order #${id} | Mahara` : 'Order | Mahara';
	}

	// My Account subpages
	if (pathname.startsWith('/my-account')) {
		if (pathname === '/my-account') {
			return 'Account | Mahara';
		}
		const sub = pathname.replace('/my-account', '').replace('/', '');
		if (sub === 'orders') return 'My Orders | Mahara';
		if (sub === 'account-details') return 'Profile | Mahara';
		if (sub === 'change-password') return 'Change Password | Mahara';
		return `${formatWord(sub)} | Mahara`;
	}

	// Static Pages Mappings
	if (pathname === '/checkout') return 'Checkout | Mahara';
	if (pathname === '/order') return 'Order Confirmation | Mahara';
	if (pathname === '/signin') return 'Login | Mahara';
	if (pathname === '/signup') return 'Register | Mahara';
	if (pathname === '/forget-password') return 'Forgot Password | Mahara';
	if (pathname === '/wishlist') return 'Wishlist | Mahara';
	if (pathname === '/faq') return 'FAQ | Mahara';
	if (pathname === '/privacy') return 'Privacy Policy | Mahara';
	if (pathname === '/terms') return 'Terms & Conditions | Mahara';
	if (pathname === '/contact-us') return 'Contact Us | Mahara';
	if (pathname === '/404') return '404 | Mahara';
	if (pathname === '/search') {
		const searchVal = query.q?.toString() || query.query?.toString() || '';
		return searchVal ? `Search: "${searchVal}" | Mahara` : 'Shop | Mahara';
	}

	// Handle standard routes fallback with mapping
	const cleanPath = pathname.replace('/', '');
	if (cleanPath) {
		const pageKey = `text-page-${cleanPath}`;
		const translatedPage = t(pageKey);
		if (translatedPage && translatedPage !== pageKey) {
			return `${translatedPage} | Mahara`;
		}

		const commonKey = `text-${cleanPath}`;
		const translatedCommon = t(commonKey);
		if (translatedCommon && translatedCommon !== commonKey) {
			return `${translatedCommon} | Mahara`;
		}

		return `${formatWord(cleanPath)} | Mahara`;
	}

	return 'Mahara';
}

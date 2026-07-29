import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useLogoutMutation } from "@framework/auth/use-logout";
import { useTranslation } from "next-i18next";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const OrdersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const accountMenu = [
    {
        slug: ROUTES.ACCOUNT,
        name: "text-dashboard",
        icon: <HomeIcon />,
    },
    {
        slug: ROUTES.ORDERS,
        name: "text-orders",
        icon: <OrdersIcon />,
    },
    {
        slug: ROUTES.ACCOUNT_DETAILS,
        name: "text-account-details",
        icon: <UserIcon />,
    },
    {
        slug: ROUTES.CHANGE_PASSWORD,
        name: "text-change-password",
        icon: <SettingsIcon />,
    },
];

export default function AccountNav() {
    const { mutate: logout } = useLogoutMutation();
    const { pathname } = useRouter();
    const newPathname = pathname.split("/").slice(2, 3);
    const mainPath = `/${newPathname[0]}`;
    const { t } = useTranslation("common");
    return (
        <nav className="account-nav">
            {accountMenu.map((item) => {
                const menuPathname = item.slug.split("/").slice(2, 3);
                const menuPath = `/${menuPathname[0]}`;
                const isActive = mainPath === menuPath;

                return (
                    <Link
                        key={item.slug}
                        href={item.slug}
                        className={`account-nav__link ${
                            isActive ? "account-nav__link--active" : ""
                        }`}
                    >
                        {item.icon}
                        <span>
                            {t(`${item.name}`)}
                        </span>
                    </Link>
                );
            })}
            <button
                className="account-nav__btn"
                onClick={() => logout()}
            >
                <LogoutIcon />
                <span>{t("text-logout")}</span>
            </button>
        </nav>
    );
}

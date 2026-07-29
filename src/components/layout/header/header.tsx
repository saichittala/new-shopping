import React, { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
import { siteSettings } from "@settings/site-settings";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { useAddActiveScroll } from "@utils/use-add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import CategoryMenu from "@components/ui/category-menu";
import { FiUser } from "react-icons/fi";

import { useRouter } from "next/router";
import cn from "classnames";

const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});
const WishButton = dynamic(() => import("@components/ui/wish-button"), {
  ssr: false,
});

const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { openSearch, openModal, setModalView, isAuthorized } = useUI();
  const { t } = useTranslation("common");
  const siteHeaderRef = useRef<HTMLDivElement>(null);
  useAddActiveScroll(siteHeaderRef);
  const router = useRouter();
  const isHome = router.pathname === "/";

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  return (
    <header id="siteHeader" className={cn("site-header", { "site-header--transparent": isHome })}>
      <div ref={siteHeaderRef} className="site-header__inner innerSticky">
        <div className="site-header__row">
          {/* Logo & Category Outline Dropdown */}
          <div className="site-header__brand">
            <Logo />
            <CategoryMenu
              className="relative hidden lg:block ltr:ml-6 rtl:mr-6 lg:ltr:ml-8 lg:rtl:mr-8"
              categoryMenu={site_header?.categoryMenu}
              variant="outline"
            />
          </div>
          {/* Right-side action buttons */}
          <div className="site-header__actions">
            {/* Search */}
            <button
              className="site-header__search-btn"
              onClick={openSearch}
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Wishlist */}
            <WishButton />

            {/* Cart */}
            <CartButton />

            {/* Account / Sign In */}
            <div className="site-header__auth">
              <AuthMenu
                isAuthorized={isAuthorized}
                href={ROUTES.ACCOUNT}
                className="site-header__auth-btn"
                btnProps={{
                  onClick: handleLogin,
                }}
              >
                <FiUser />
                <span>{isAuthorized ? "Account" : t("text-sign-in")}</span>
              </AuthMenu>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
import cn from 'classnames';
import ListMenu from '@components/ui/list-menu';
import { useTranslation } from 'next-i18next';

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="category-menu__icon-leading"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="category-menu__icon-trailing"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface CategoryMenuProps {
  className?: string;
  categoryMenu: any;
  variant?: "default" | "outline";
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  className,
  categoryMenu,
  variant = "default",
}) => {
  const { t } = useTranslation('menu');

  return (
    <div className={cn('category-menu', `category-menu--${variant}`, className)}>
      <div className="category-menu__trigger">
        <HamburgerIcon />
        <span>{t('menu-all-categories')}</span>
        <ChevronDownIcon />
      </div>

      {categoryMenu && Array.isArray(categoryMenu) && (
        <div className="category-menu__popover">
          <ul className="category-menu__list">
            {categoryMenu.map((menu: any, index: number) => {
              const dept: number = 1;
              const menuName: string = `sidebar-menu-${dept}-${index}`;
              return (
                <ListMenu
                  dept={dept}
                  data={menu}
                  hasSubMenu={menu.subMenu}
                  hasMegaMenu={menu.columns}
                  hasBrands={menu.brands}
                  hasBanners={menu.banners}
                  menuName={menuName}
                  key={menuName}
                  menuIndex={index}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;

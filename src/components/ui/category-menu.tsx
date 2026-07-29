import cn from 'classnames';
import ListMenu from '@components/ui/list-menu';

const HamburgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="category-menu__icon-leading"
  >
    <path
      d="M3 8.5H21M3 15.5H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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

  return (
    <div className={cn('category-menu', `category-menu--${variant}`, className)}>
      <div className="category-menu__trigger">
        <HamburgerIcon />
        <span>Menu</span>
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

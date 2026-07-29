import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "./link";
import MegaMenu from "./mega-menu";

const ChevronRightIcon = () => (
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
    className="category-menu__arrow"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ListMenu = ({
  dept,
  data,
  hasSubMenu,
  hasMegaMenu,
  hasBrands,
  hasBanners,
  menuIndex,
}: any) => {
  const { t } = useTranslation("menu");
  return (
    <li className="category-menu__item">
      <Link href={data.path} className="category-menu__link">
        {data.icon && (
          <span className="category-menu__item-icon">{data.icon}</span>
        )}
        {t(data.label)}
        {data.subMenu && <ChevronRightIcon />}
      </Link>

      {hasSubMenu && (
        <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />
      )}

      {(hasMegaMenu || hasBrands || hasBanners) && (
        <div className="category-menu__mega-popover">
          <div className="category-menu__mega-columns">
            <MegaMenu columns={hasMegaMenu} />
          </div>
          <div className="category-menu__mega-right">
            {hasBrands && Array.isArray(hasBrands) && (
              <div className="category-menu__brands">
                {hasBrands.map((brand: any) => (
                  <Link
                    href={brand.path}
                    key={brand.id}
                    className="category-menu__brand-item"
                  >
                    <Image
                      src={brand.icon.src}
                      height={60}
                      width={150}
                      alt={brand.label}
                    />
                  </Link>
                ))}
              </div>
            )}
            {hasBanners && Array.isArray(hasBanners) && (
              <div className="category-menu__banners">
                {hasBanners.map((banner: any) => (
                  <Link href={banner.path} key={banner.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={banner.image.src} alt={banner.label} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
  dept = dept + 1;
  return (
    <div className="category-menu__child-popover">
      <ul className="category-menu__list">
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ListMenu;

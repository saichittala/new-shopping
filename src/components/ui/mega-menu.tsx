import React from 'react';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

interface MenuItem {
  id: number | string;
  path: string;
  label: string;
  columnItemItems?: MenuItem[];
}

type MegaMenuProps = {
  columns: {
    id: number | string;
    columnItems: MenuItem[];
  }[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ columns }) => {
  const { t } = useTranslation('menu');
  return (
    <div className="category-menu__mega-grid-wrap">
      <div 
        className="category-menu__mega-grid"
        style={{ gridTemplateColumns: `repeat(${columns?.length || 3}, 1fr)` }}
      >
        {columns?.map((column) => (
          <ul
            className="category-menu__mega-col"
            key={column.id}
          >
            {column?.columnItems?.map((columnItem) => (
              <React.Fragment key={columnItem.id}>
                <li className="category-menu__mega-title-item">
                  <Link
                    href={columnItem.path}
                    className="category-menu__mega-title-link"
                  >
                    {t(columnItem.label)}
                  </Link>
                </li>
                {columnItem?.columnItemItems?.map((item: any) => (
                  <li
                    key={item.id}
                    className={cn("category-menu__mega-subitem", {
                      "category-menu__mega-subitem--divider":
                        columnItem?.columnItemItems?.length === item.id,
                    })}
                  >
                    <Link
                      href={item.path}
                      className="category-menu__mega-sublink"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;

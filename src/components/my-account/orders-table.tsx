import { motion } from 'framer-motion';
import { fadeInTop } from '@utils/motion/fade-in-top';
import Link from '@components/ui/link';
import { useWindowSize } from '@utils/use-window-size';
import { useTranslation } from 'next-i18next';
import { useSsrCompatible } from '@utils/use-ssr-compatible';

const OrdersTable: React.FC = () => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { t } = useTranslation('common');
  return (
    <>
      <h2 className="account-orders__title">
        {t('text-orders')}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className="account-orders"
      >
        {width >= 1025 ? (
          <table className="account-orders__desktop-table">
            <thead>
              <tr>
                <th className="account-orders__th">
                  {t('text-order')}
                </th>
                <th className="account-orders__th account-orders__th--center">
                  {t('text-date')}
                </th>
                <th className="account-orders__th account-orders__th--center">
                  {t('text-status')}
                </th>
                <th className="account-orders__th account-orders__th--center">
                  {t('text-total')}
                </th>
                <th className="account-orders__th account-orders__th--right">
                  {t('text-actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="account-orders__td">
                  <Link
                    href="/my-account/orders/3203"
                    className="account-orders__order-link"
                  >
                    #3203
                  </Link>
                </td>
                <td className="account-orders__td account-orders__td--center">
                  March 18, 2021
                </td>
                <td className="account-orders__td account-orders__td--center">
                  Completed
                </td>
                <td className="account-orders__td account-orders__td--center">
                  $16,950.00 for 93 items
                </td>
                <td className="account-orders__td account-orders__td--right">
                  <Link
                    href="/my-account/orders/3203"
                    className="account-orders__view-btn"
                  >
                    {t('button-view')}
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="account-orders__td">
                  <Link
                    href="/my-account/orders/3204"
                    className="account-orders__order-link"
                  >
                    #3204
                  </Link>
                </td>
                <td className="account-orders__td account-orders__td--center">
                  March 18, 2021
                </td>
                <td className="account-orders__td account-orders__td--center">
                  Completed
                </td>
                <td className="account-orders__td account-orders__td--center">
                  $16,950.00 for 93 items
                </td>
                <td className="account-orders__td account-orders__td--right">
                  <Link
                    href="/my-account/orders/3204"
                    className="account-orders__view-btn"
                  >
                    {t('button-view')}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="account-orders__mobile-list">
            <ul className="account-orders__card">
              <li className="account-orders__card-item">
                {t('text-order')}
                <span className="account-orders__card-value">
                  <Link
                    href="/my-account/orders/3203"
                    className="account-orders__order-link"
                  >
                    #3203
                  </Link>
                </span>
              </li>
              <li className="account-orders__card-item">
                {t('text-date')}
                <span className="account-orders__card-value">March 18, 2021</span>
              </li>
              <li className="account-orders__card-item">
                {t('text-status')}
                <span className="account-orders__card-value">Completed</span>
              </li>
              <li className="account-orders__card-item">
                {t('text-total')}
                <span className="account-orders__card-value">$16,950.00 for 93 items</span>
              </li>
              <li className="account-orders__card-item">
                {t('text-actions')}
                <span>
                  <Link
                    href="/my-account/orders/3203"
                    className="account-orders__view-btn"
                  >
                    {t('button-view')}
                  </Link>
                </span>
              </li>
            </ul>
            <ul className="account-orders__card">
              <li className="account-orders__card-item">
                {t('text-order')}
                <span className="account-orders__card-value">
                  <Link
                    href="/my-account/orders/3204"
                    className="account-orders__order-link"
                  >
                    #3204
                  </Link>
                </span>
              </li>
              <li className="account-orders__card-item">
                {t('text-date')}
                <span className="account-orders__card-value">March 18, 2021</span>
              </li>
              <li className="account-orders__card-item">
                {t('text-status')}
                <span className="account-orders__card-value">Completed</span>
              </li>
              <li className="account-orders__card-item">
                {t('text-total')}
                <span className="account-orders__card-value">$16,950.00 for 93 items</span>
              </li>
              <li className="account-orders__card-item">
                {t('text-actions')}
                <span>
                  <Link
                    href="/my-account/orders/3204"
                    className="account-orders__view-btn"
                  >
                    {t('button-view')}
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrdersTable;

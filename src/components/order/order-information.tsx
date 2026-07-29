import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@components/order/order-details';
import { useOrderQuery } from '@framework/order/get-order';
import { useRouter } from 'next/router';
import usePrice from '@framework/product/use-price';
import { useTranslation } from 'next-i18next';
import Button from '@components/ui/button';
import { ROUTES } from '@utils/routes';

export default function OrderInformation() {
  const {
    query: { id },
  } = useRouter();
  const { t } = useTranslation('common');
  const { data, isLoading } = useOrderQuery(id?.toString()!);
  const { price: total } = usePrice(
    data && {
      amount: data.shipping_fee ? data.total + data.shipping_fee : data.total,
      currencyCode: 'USD',
    }
  );

  if (isLoading) return <p>Loading...</p>;

  // Convert Payment Method cash text to COD
  const paymentMethod = data?.payment_gateway?.toLowerCase()?.includes('cash') ? 'COD' : data?.payment_gateway;

  return (
    <div>
      {/* Success Banner */}
      <div className="order-page__success-banner">
        <span className="order-page__success-icon-wrap">
          <IoCheckmarkCircle className="order-page__success-icon" />
        </span>
        <div className="order-page__success-content">
          <span className="order-page__success-title">{t('text-order-received')}</span>
          <span className="order-page__order-id">Order ID: {data?.tracking_number}</span>
        </div>
      </div>

      {/* Meta Grid Card (2 columns only - Total and Payment Method) */}
      <ul className="order-page__meta-card">
        <li className="order-page__meta-item">
          <span className="order-page__meta-label">
            {t('text-total')}:
          </span>
          <span className="order-page__meta-value">
            {total}
          </span>
        </li>
        <li className="order-page__meta-item">
          <span className="order-page__meta-label">
            {t('text-payment-method')}:
          </span>
          <span className="order-page__meta-value order-page__meta-value--normal">
            {paymentMethod}
          </span>
        </li>
      </ul>

      <OrderDetails />

      {/* Actions */}
      <div className="order-page__actions">
        <Button href={ROUTES.HOME} color="outline" className="order-page__continue-btn">
          Continue Shopping
        </Button>
        <Button href={ROUTES.ORDERS} color="secondary" className="order-page__orders-btn">
          View Orders
        </Button>
      </div>
    </div>
  );
}

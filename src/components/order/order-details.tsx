import { useOrderQuery } from '@framework/order/get-order';
import usePrice from '@framework/product/use-price';
import { OrderItem } from '@framework/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: 'USD',
  });
  return (
    <tr key={product.id}>
      <td>
        {product.name} * {product.quantity}
      </td>
      <td>{itemTotal}</td>
    </tr>
  );
};

const OrderDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { t } = useTranslation('common');
  const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  const { price: subtotal } = usePrice(
    order && {
      amount: order.total,
      currencyCode: 'USD',
    }
  );
  const { price: total } = usePrice(
    order && {
      amount: order.shipping_fee
        ? order.total + order.shipping_fee
        : order.total,
      currencyCode: 'USD',
    }
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.shipping_fee,
      currencyCode: 'USD',
    }
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="order-details">
      <h2 className="order-details__title">
        {t('text-order-details')}:
      </h2>
      <table className="order-details__table">
        <thead>
          <tr>
            <th>{t('text-product')}</th>
            <th>{t('text-total')}</th>
          </tr>
        </thead>
        <tbody>
          {order?.products.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>{t('text-sub-total')}:</td>
            <td>{subtotal}</td>
          </tr>
          <tr>
            <td>{t('text-shipping')}:</td>
            <td>
              {shipping}
              <span className="order-details__shipping-method">
                via Flat rate
              </span>
            </td>
          </tr>
          <tr className="order-details__total-row">
            <td>{t('text-total')}:</td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;

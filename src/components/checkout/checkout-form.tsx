import Input from '@components/ui/input';
import { useFormContext } from 'react-hook-form';
import TextArea from '@components/ui/text-area';
import { CheckBox } from '@components/ui/checkbox';
import { useTranslation } from 'next-i18next';

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}

const CheckoutForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutInputType>();

  return (
    <>
      <h2 className="checkout-page__title">
        {t('text-shipping-address')}
      </h2>
      <div className="checkout-page__form-fields">
        <div className="checkout-page__row">
          <div className="checkout-page__col-half">
            <Input
              labelKey="forms:label-first-name"
              {...register('firstName', {
                required: 'forms:first-name-required',
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
            />
          </div>
          <div className="checkout-page__col-half">
            <Input
              labelKey="forms:label-last-name"
              {...register('lastName', {
                required: 'forms:last-name-required',
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
            />
          </div>
        </div>
        <Input
          labelKey="forms:label-address"
          {...register('address', {
            required: 'forms:address-required',
          })}
          errorKey={errors.address?.message}
          variant="solid"
        />
        <div className="checkout-page__row">
          <div className="checkout-page__col-half">
            <Input
              type="tel"
              labelKey="forms:label-phone"
              {...register('phone', {
                required: 'forms:phone-required',
              })}
              errorKey={errors.phone?.message}
              variant="solid"
            />
          </div>
          <div className="checkout-page__col-half">
            <Input
              type="email"
              labelKey="forms:label-email-star"
              {...register('email', {
                required: 'forms:email-required',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms:email-error',
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
            />
          </div>
        </div>
        <div className="checkout-page__row">
          <div className="checkout-page__col-half">
            <Input
              labelKey="forms:label-city"
              {...register('city')}
              variant="solid"
            />
          </div>
          <div className="checkout-page__col-half">
            <Input
              labelKey="forms:label-postcode"
              {...register('zipCode')}
              variant="solid"
            />
          </div>
        </div>
        <div className="checkout-page__checkbox-wrap">
          <CheckBox labelKey="forms:label-save-information" />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;

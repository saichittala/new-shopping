import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { fadeInTop } from '@utils/motion/fade-in-top';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import { RadioBox } from '@components/ui/radiobox';
import { useTranslation } from 'next-i18next';

const defaultValues = {};
const AccountDetails: React.FC = () => {
  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      variants={fadeInTop(0.35)}
      className="account-details"
    >
      <h2 className="account-details__title">
        {t('common:text-account-details')}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="account-details__form"
        noValidate
      >
        <div className="account-details__grid-row">
          <Input
            labelKey="forms:label-first-name"
            {...register('firstName', {
              required: 'forms:first-name-required',
            })}
            variant="solid"
            errorKey={errors.firstName?.message}
          />
          <Input
            labelKey="forms:label-last-name"
            {...register('lastName', {
              required: 'forms:last-name-required',
            })}
            variant="solid"
            errorKey={errors.lastName?.message}
          />
        </div>
        
        <Input
          labelKey="forms:label-display-name"
          {...register('displayName', {
            required: 'forms:display-name-required',
          })}
          variant="solid"
          errorKey={errors.displayName?.message}
        />
        
        <div className="account-details__grid-row">
          <Input
            type="tel"
            labelKey="forms:label-phone"
            {...register('phoneNumber', {
              required: 'forms:phone-required',
            })}
            variant="solid"
            errorKey={errors.phoneNumber?.message}
          />
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
            variant="solid"
            errorKey={errors.email?.message}
          />
        </div>
        
        <div className="account-details__gender-section">
          <span className="account-details__gender-label">
            {t('common:text-gender')}
          </span>
          <div className="account-details__gender-group">
            <RadioBox
              labelKey="forms:label-male"
              {...register('gender')}
              value="male"
            />
            <RadioBox
              labelKey="forms:label-female"
              {...register('gender')}
              value="female"
            />
          </div>
        </div>
        
        <div className="account-details__submit-wrap">
          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
          >
            {t('common:button-save')}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountDetails;

import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/text-area';
import ReactStars from 'react-rating-stars-component';
import { CheckBox } from '@components/ui/checkbox';
import { useTranslation } from 'next-i18next';

interface ReviewFormValues {
  name: string;
  email: string;
  cookie: string;
  message: string;
}

const ReviewForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  function onSubmit(values: ReviewFormValues) {
    console.log(values, 'review');
  }
  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };
  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="review-form"
      noValidate
    >
      <div className="review-form__wrapper">
        <div className="review-form__rating">
          <label className="review-form__rating-label">
            {t('forms:label-your-rating')}
          </label>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={20}
            color="#c6c6c6"
            activeColor="#202020"
          />
        </div>
        <TextArea
          labelKey="forms:label-message-star"
          {...register('message', { required: 'Message is required' })}
          errorKey={errors.message?.message}
        />
        <div className="review-form__input-row">
          <Input
            labelKey="forms:label-name-star"
            {...register('name', { required: 'Name is required' })}
            className="review-form__input review-form__input--half"
            errorKey={errors.name?.message}
            variant="solid"
          />
          <Input
            labelKey="forms:label-email-star"
            type="email"
            {...register('email', {
              required: 'forms:email-required',
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'forms:email-error',
              },
            })}
            className="review-form__input review-form__input--half review-form__input--email"
            errorKey={errors.email?.message}
            variant="solid"
          />
        </div>
        <CheckBox
          {...register('cookie')}
          labelKey="forms:label-save-review-information"
        />
        <div className="review-form__submit-wrap">
          <Button
            type="submit"
            className="review-form__submit-btn"
          >
            {t('common:button-submit')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;

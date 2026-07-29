import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';

interface Props {
  itemKey: string;
  itemValue: string;
}

export const FilteredItem = ({ itemKey, itemValue }: Props) => {
  const router = useRouter();
  const { pathname, query } = router;

  function handleClose() {
    const currentItem = (query[itemKey]! as string)
      .split(',')
      .filter((i) => i !== itemValue);
    delete query[itemKey];
    router.push({
      pathname,
      query: {
        ...query,
        ...(!isEmpty(currentItem) ? { [itemKey]: currentItem.join(',') } : {}),
      },
    });
  }

  return (
    <button
      className="filter-tag"
      onClick={handleClose}
      aria-label={`Remove filter: ${itemValue}`}
    >
      {itemValue}
      {/* Untitled UI × icon */}
      <span className="filter-tag__close" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
};

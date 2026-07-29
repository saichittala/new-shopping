import cn from 'classnames';

interface Props {
  className?: string;
  title: string;
  attributes: {
    id: number;
    value: string;
    meta: string;
  }[];
  active: string;
  onClick: any;
}

export const ProductAttributes: React.FC<Props> = ({
  className = 'product-attrs',
  title,
  attributes,
  active,
  onClick,
}) => {
  const isSize = title.toLowerCase() === 'size' || title.toLowerCase() === 'sizes';
  return (
    <div className={className}>
      {isSize ? (
        <div className="product-detail__sizes-header">
          <h3 className="product-detail__sizes-title">{title}</h3>
          <button type="button" className="product-detail__sizes-chart-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6a1 1 0 011-1h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 5v4m4-4v2m4-4v4m4-4v2" />
            </svg>
            Size Chart
          </button>
        </div>
      ) : (
        <h3 className="product-detail__variation-label">
          {title}
          {active && <span>: {active}</span>}
        </h3>
      )}
      <ul className="product-attrs__list">
        {attributes?.map(({ id, value, meta }) => (
          <li
            key={`${value}-${id}`}
            className={cn('product-attrs__item', {
              'product-attrs__item--active': value === active,
              'product-attrs__item--color': title === 'color' || title === 'Color',
            })}
            onClick={() => onClick({ [title]: value })}
          >
            {title === 'color' ? (
              <span
                className="product-attrs__swatch"
                style={{ backgroundColor: meta }}
              />
            ) : (
              value
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

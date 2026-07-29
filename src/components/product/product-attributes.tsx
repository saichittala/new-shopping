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
  return (
    <div className={className}>
      <h3 className="product-attrs__title">{title}</h3>
      <ul className="product-attrs__list">
        {attributes?.map(({ id, value, meta }) => (
          <li
            key={`${value}-${id}`}
            className={cn('product-attrs__item', {
              'product-attrs__item--active': value === active,
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

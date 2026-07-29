import Text from '@components/ui/text'
import Link from '@components/ui/link'
import { useTranslation } from 'next-i18next'

interface Props {
  sectionHeading: string
  categorySlug?: string
  className?: string
  textClassName?: string
}

const SectionHeader: React.FC<Props> = ({
  sectionHeading = 'text-section-title',
  categorySlug,
  className = '',
  textClassName = '',
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={`section-heading-row ${className}`}>
      <Text className={`section-title ${textClassName}`} variant='mediumHeading'>
        {t(`${sectionHeading}`)}
      </Text>
      {categorySlug && (
        <Link
          href={categorySlug}
          className="section-see-all"
        >
          {t('text-see-all-product')}
        </Link>
      )}
    </div>
  )
}

export default SectionHeader

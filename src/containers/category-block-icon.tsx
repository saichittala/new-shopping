import IconCard from "@components/common/icon-card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import CardIconLoader from "@components/ui/loaders/card-icon-loader";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { ROUTES } from "@utils/routes";
import Alert from "@components/ui/alert";
import cn from "classnames";
import { SwiperSlide } from "swiper/react";
import { Category } from "@framework/types";

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  variant?: "default" | "modern" | "circle" | "list" | "luxury";
}

const breakpoints = {
  "1780": {
    slidesPerView: 7,
    spaceBetween: 12,
  },
  "1280": {
    slidesPerView: 6,
    spaceBetween: 12,
  },
  "1025": {
    slidesPerView: 5,
    spaceBetween: 12,
  },
  "768": {
    slidesPerView: 4,
    spaceBetween: 12,
  },
  "480": {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
};
const breakpointsCircle = {
  "1720": {
    slidesPerView: 8,
    spaceBetween: 48,
  },
  "1400": {
    slidesPerView: 7,
    spaceBetween: 32,
  },
  "1025": {
    slidesPerView: 6,
    spaceBetween: 28,
  },
  "768": {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  "500": {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  "0": {
    slidesPerView: 3,
    spaceBetween: 12,
  },
};

const breakpointsList = {
  "1780": {
    slidesPerView: 5,
    spaceBetween: 12,
  },
  "1280": {
    slidesPerView: 4,
    spaceBetween: 12,
  },
  "1025": {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  "768": {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  "480": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1.3,
    spaceBetween: 12,
  },
};

const CategoryBlockIcon: React.FC<CategoriesProps> = ({
  className = "mb-12 md:mb-14 xl:mb-16",
  sectionHeading,
  variant = "default",
}) => {
  const { data, isLoading, error } = useCategoriesQuery({
    limit: 10,
  });

  return (
    <div className={cn(className, { "prada-categories-container": variant === "luxury" })}>
      {variant !== "luxury" && <SectionHeader sectionHeading={sectionHeading} />}
      {variant === "luxury" && (
        <div className="prada-categories-header">
          <h2>Browse by Category</h2>
        </div>
      )}
      {error ? (
        <Alert message={error?.message} />
      ) : variant === "luxury" ? (
        <div className="prada-categories-grid">
          {isLoading && !data
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={`loader-${idx}`} className="prada-category-item p-6 bg-gray-50 animate-pulse h-32 md:h-48" />
              ))
            : data?.categories?.data?.slice(0, 8).map((category: Category) => (
                <div key={`category-item-${category.id}`} className="prada-category-item">
                  <IconCard
                    item={category}
                    href={`${ROUTES.CATEGORY}/${category.slug}`}
                    variant="luxury"
                  />
                </div>
              ))}
        </div>
      ) : (
        <Carousel
          autoplay={{
            delay: 4000,
          }}
          breakpoints={
            variant === "circle"
              ? breakpointsCircle
              : variant === "list"
              ? breakpointsList
              : breakpoints
          }
          buttonGroupClassName={variant === "circle" ? "-mt-4" : "-mt-2"}
        >
          {isLoading && !data
            ? Array.from({ length: 10 }).map((_, idx) => {
                return (
                  <SwiperSlide key={`card-rounded-${idx}`}>
                    {variant === "circle" ? (
                      <CardRoundedLoader uniqueKey={`card-circle-${idx}`} />
                    ) : (
                      <CardIconLoader uniqueKey={`card-rounded-${idx}`} />
                    )}
                  </SwiperSlide>
                );
              })
            : data?.categories?.data?.map((category: Category) => (
                <SwiperSlide key={`category--icon-key-${category.id}`}>
                  <IconCard
                    item={category}
                    href={`${ROUTES.CATEGORY}/${category.slug}`}
                    effectActive={true}
                    variant={variant}
                  />
                </SwiperSlide>
              ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryBlockIcon;

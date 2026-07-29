import Link from "@components/ui/link";
import Text from "@components/ui/text";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { useState, useEffect } from "react";

interface Props {
  item: any;
  effectActive?: boolean;
  variant?: "default" | "modern" | "circle" | "list" | "luxury";
  href: LinkProps["href"];
}

const categoryThemes = [
  {
    background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)", // soft blue
    titleColor: "#1E40AF",
  },
  {
    background: "linear-gradient(135deg, #FDF2F2 0%, #FDE8E8 100%)", // soft pink
    titleColor: "#B91C1C",
  },
  {
    background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)", // soft green
    titleColor: "#15803D",
  },
  {
    background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)", // soft purple
    titleColor: "#6D28D9",
  },
  {
    background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)", // soft orange
    titleColor: "#C2410C",
  },
];

const getTheme = (name: string) => {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return categoryThemes[hash % categoryThemes.length];
};

const IconCard: React.FC<Props> = ({
  item,
  effectActive = false,
  variant = "default",
  href,
}) => {
  const { name, icon, tags, productCount } = item ?? {};
  const { t } = useTranslation("common");

  const [imgSrc, setImgSrc] = useState(icon || "/assets/images/category/bags.jpg");

  useEffect(() => {
    setImgSrc(icon || "/assets/images/category/bags.jpg");
  }, [icon]);

  const handleImgError = () => {
    const key = name ? name.toLowerCase() : "";
    let fallback = "/assets/images/category/bags.jpg";
    if (key.includes("sunglass") || key.includes("eyewear")) {
      fallback = "/assets/images/category/sunglass.jpg";
    } else if (key.includes("hat") || key.includes("glove") || key.includes("belt") || key.includes("man")) {
      fallback = "/assets/images/category/man.jpg";
    } else if (key.includes("scarf") || key.includes("silk") || key.includes("jewel") || key.includes("hair") || key.includes("headband") || key.includes("woman")) {
      fallback = "/assets/images/category/woman.jpg";
    } else if (key.includes("watch")) {
      fallback = "/assets/images/category/watch.jpg";
    } else if (key.includes("kid")) {
      fallback = "/assets/images/category/kid.jpg";
    } else if (key.includes("sneaker")) {
      fallback = "/assets/images/category/sneakers.jpg";
    } else if (key.includes("sport")) {
      fallback = "/assets/images/category/sports.jpg";
    }
    setImgSrc(fallback);
  };

  if (variant === "luxury") {
    return (
      <Link href={href} className="prada-category-card">
        {/* Image wrap with light gray background - exact square */}
        <div className="prada-category-image-wrap">
          <img
            src={imgSrc}
            onError={handleImgError}
            alt={name || "Category Image"}
            className="prada-category-image"
          />
        </div>
        
        {/* Centered label below - sentence case, small text */}
        <div className="prada-category-label-wrap">
          <h3 className="prada-category-label">
            {name}
          </h3>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    const theme = getTheme(name || "");
    return (
      <Link
        href={href}
        className="category-card-list group"
        style={{
          background: theme.background,
          borderRadius: "12px",
          border: "none",
        }}
      >
        <div className="category-card-list__info">
          <h3 className="category-card-list__name" style={{ color: theme.titleColor }}>
            {name}
          </h3>
          <p className="category-card-list__count">
            {`${productCount || 0}+ ${t("text-products")}`}
          </p>
        </div>
        <div className="category-card-list__image-wrap">
          <img
            src={icon}
            alt={name || t("text-card-thumbnail")}
            className="category-card-list__image"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn("group flex justify-center  rounded-lg", {
        "flex-col h-28 sm:h-[8.5rem] md:h-40 xl:h-[11.5rem] 2xl:h-44 3xl:h-60 bg-gray-200":
          variant === "default",
        "flex-col px-6 lg:px-8 pt-7 lg:pt-10 pb-5 lg:pb-8 bg-gray-200":
          variant === "modern",
        "flex-col items-center": variant === "circle",
      })}
    >
      <div
        className={cn("relative flex items-center", {
          "mb-3.5 md:mb-4 lg:mb-5 xl:mb-2 2xl:mb-6 3xl:mb-8 lg:h-24 mx-auto":
            variant === "default",
          "ltr:mr-auto rtl:ml-auto h-16": variant === "modern",
          "bg-gray-200 justify-center rounded-full mb-3.5 md:mb-4 lg:mb-5 w-[105px] md:w-32 lg:w-[140px] xl:w-44 h-[105px] md:h-32 lg:h-[140px] xl:h-44 max-w-full":
            variant === "circle",
        })}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={name || t("text-card-thumbnail")}
          className={cn("mb-0", {
            "mx-auto mb-4 sm:mb-6 w-2/4 sm:w-2/3 md:w-8/12 3xl:w-full":
              variant === "default",
            "mb-4 sm:mb-6 w-2/4": variant === "modern",
            "transform scale-[0.6] lg:scale-75 2xl:scale-85 3xl:scale-90":
              variant === "circle",
          })}
        />
        {effectActive === true && variant === "circle" && (
          <>
            <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-full" />
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center rounded-full">
              <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col">
        <Text
          variant="heading"
          className={cn("capitalize", {
            "absolute text-center bottom-4 sm:bottom-5 md:bottom-6 xl:bottom-8 inset-x-0":
              variant === "default",
            "mb-1": variant === "modern",
          })}
        >
          {name}
        </Text>

        {variant === "modern" && (
          <Text className="pb-0.5 truncate">
            {`${tags?.length} ${t("text-brands")}, ${productCount}+ ${t(
              "text-products"
            )}`}
          </Text>
        )}
      </div>

      {effectActive === true && (
        <>
          <div className="absolute top-0 left-0 bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 rounded-lg" />
          <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center  rounded-lg">
            <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
          </div>
        </>
      )}
    </Link>
  );
};

export default IconCard;

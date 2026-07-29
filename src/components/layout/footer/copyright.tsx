import Container from "@components/ui/container";
import { siteSettings } from "@settings/site-settings";
import { useTranslation } from "next-i18next";
import { AiOutlineArrowUp } from "react-icons/ai";
import cn from "classnames";
import Link from "@components/ui/link";

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
  variant?: "contemporary";
}

const year = new Date().getFullYear();

const Copyright: React.FC<CopyrightProps> = ({ payment, variant }) => {
  const { t } = useTranslation("footer");
  return (
    <div className="footer__copyright">
      <Container
        className={cn("footer__copyright-row", {
          "footer__copyright-row--centered": variant === "contemporary",
        })}
      >
        <p
          className={cn("footer__copyright-text", {
            "footer__copyright-text--flush": variant === "contemporary",
          })}
        >
          {t("text-copyright")} &copy; {year}&nbsp;
          <a
            className="footer__copyright-link"
            href={siteSettings.author.websiteUrl}
          >
            {siteSettings.author.name}
          </a>
          &nbsp; {t("text-all-rights-reserved")}
        </p>

        {payment && (
          <ul className="footer__payment-list">
            {payment?.map((item) => (
              <li
                className="footer__payment-item"
                key={`payment-list--key${item.id}`}
              >
                <a href={item.path ? item.path : "/#"} target="_blank">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={t(`${item.name}`)}
                    height={item.height}
                    width={item.width}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}

        {variant === "contemporary" && (
          <Link href="#siteHeader" className="footer__scroll-top">
            Scroll to top
            <AiOutlineArrowUp />
          </Link>
        )}
      </Container>
    </div>
  );
};

export default Copyright;

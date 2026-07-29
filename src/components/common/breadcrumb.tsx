import React from "react";
import ActiveLink from "@components/ui/active-link";
import useBreadcrumb, { convertBreadcrumbTitle } from "@utils/use-breadcrumb";
import { useTranslation } from "next-i18next";

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="breadcrumb__item"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="breadcrumb__separator" {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="breadcrumb chawkbazarBreadcrumb">
      <ol className="breadcrumb__list">{children}</ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string }> = ({ separator = "/" }) => {
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation("common");
  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink href={"/"} activeClassName="breadcrumb__item--active">
        {t("breadcrumb-home")}
      </ActiveLink>

      {breadcrumbs?.map((breadcrumb: any) => (
        <ActiveLink
          href={breadcrumb.href}
          activeClassName="breadcrumb__item--active"
          className="capitalize"
          key={breadcrumb.href}
        >
          {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
        </ActiveLink>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;

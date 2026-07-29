import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
    className?: string;
    style?: React.CSSProperties;
}

export default function Link({
    href,
    children,
    ...props
}: React.PropsWithChildren<LinkProps>) {
    return (
        <NextLink href={href} {...props}>
            {children}
        </NextLink>
    );
}

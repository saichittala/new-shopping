import { useMemo } from "react";

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0, // No decimals for clean Indian Rupee display
  });

  return formatCurrency.format(amount);
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number;
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const hasDiscount = baseAmount > amount;
  const formatDiscount = new Intl.NumberFormat(locale, { style: "percent" });
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null;

  const price = formatPrice({ amount, currencyCode, locale });
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null;

  return { price, basePrice, discount };
}

export default function usePrice(
  data?: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
  } | null
) {
  const { amount, baseAmount } = data ?? {};
  const currencyCode = "INR";
  const locale = "en-IN";

  const value = useMemo(() => {
    if (typeof amount !== "number") return "";

    // Convert mock USD pricing to relevant INR scale (80x multiplier)
    const inrAmount = Math.round(amount * 80);
    const inrBaseAmount = baseAmount ? Math.round(baseAmount * 80) : undefined;

    return inrBaseAmount
      ? formatVariantPrice({ amount: inrAmount, baseAmount: inrBaseAmount, currencyCode, locale })
      : formatPrice({ amount: inrAmount, currencyCode, locale });
  }, [amount, baseAmount]);

  return typeof value === "string"
    ? { price: value, basePrice: null, discount: null }
    : value;
}

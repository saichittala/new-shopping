import cn from "classnames";
import React, { InputHTMLAttributes } from "react";
import { useTranslation } from "next-i18next";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
  shadow?: boolean;
  disableBorderRadius?: boolean;
  variant?: "normal" | "solid" | "outline";
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "block",
      labelKey,
      name,
      errorKey,
      placeholderKey,
      variant = "normal",
      shadow = false,
      type = "text",
      disableBorderRadius = false,
      inputClassName,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation();

    return (
      <div className={cn("form-field", { "form-field--error": !!errorKey }, className)}>
        {labelKey && (
          <label htmlFor={name} className="form-field__label">
            {t(labelKey)}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          // @ts-ignore
          placeholder={t(placeholderKey)}
          className={cn("form-field__input", inputClassName)}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={errorKey ? "true" : "false"}
          {...rest}
        />
        {errorKey && <p className="form-field__error">{t(errorKey)}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

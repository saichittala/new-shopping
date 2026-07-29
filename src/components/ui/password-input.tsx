import cn from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import { Eye } from "@components/icons/eye-icon";
import { EyeOff } from "@components/icons/eye-off-icon";
import { useTranslation } from "next-i18next";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelKey: string;
  name: string;
  shadow?: boolean;
  errorKey: string | undefined;
}

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "block",
      inputClassName,
      labelKey,
      name,
      errorKey,
      shadow = false,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const { t } = useTranslation();

    return (
      <div className={cn("form-field", { "form-field--error": !!errorKey }, className)}>
        {labelKey && (
          <label htmlFor={name} className="form-field__label">
            {t(labelKey)}
          </label>
        )}
        <div className="form-field__input-wrap form-field--has-icon-right">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={cn("form-field__input", inputClassName)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          <button
            type="button"
            className="form-field__icon-right cursor-pointer"
            style={{ background: 'none', border: 'none', outline: 'none' }}
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errorKey && <p className="form-field__error">{t(errorKey)}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

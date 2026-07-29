import React, { TextareaHTMLAttributes } from "react";
import cn from "classnames";
import { useTranslation } from "next-i18next";

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  labelKey?: string;
  name: string;
  placeholderKey?: string;
  errorKey?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { t } = useTranslation();
  const {
    className,
    labelKey,
    name,
    placeholderKey,
    errorKey,
    variant = "normal",
    shadow = false,
    inputClassName,
    ...rest
  } = props;

  return (
    <div className={cn("form-field", { "form-field--error": !!errorKey }, className)}>
      {labelKey && (
        <label htmlFor={name} className="form-field__label">
          {t(labelKey)}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={cn("form-field__input", inputClassName)}
        autoComplete="off"
        spellCheck="false"
        rows={4}
        ref={ref}
        // @ts-ignore
        placeholder={t(placeholderKey)}
        {...rest}
      />
      {errorKey && <p className="form-field__error">{t(errorKey)}</p>}
    </div>
  );
});

TextArea.displayName = "Textarea";

export default TextArea;

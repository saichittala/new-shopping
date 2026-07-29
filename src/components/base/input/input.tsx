import React from "react";
import cn from "classnames";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, ...props }, ref) => {
    return (
      <div className={cn("form-field", { "form-field--error": !!error })}>
        {label && (
          <label htmlFor={name} className="form-field__label">
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          ref={ref}
          className="form-field__input"
          {...props}
        />
        {error && <p className="form-field__error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

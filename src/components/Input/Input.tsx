import React from "react";
import { Control, useFormState } from "react-hook-form";
import cn from "classnames";

import { ReactComponent as ErrorIcon } from "assets/svg/form-error.svg";
import { ReactComponent as SuccessIcon } from "assets/svg/form-success.svg";
import { CardType } from "types";
import "./styles.scss";

type FormType = Pick<CardType, "name" | "CVC" | "cardNumber" | "expireDate">;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  control: Control<FormType, object>;
}
type Name = keyof FormType;
export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, InputProps>(
  ({ label, children, control, ...props }, ref) => {
    const { errors, touchedFields } = useFormState({
      control,
    });

    const name = props.name as Name;
    const isSuccess = touchedFields[name] && !errors[name];
    return (
      <div
        className={cn(
          "input",
          { "input--incorect": errors[name] },
          { "input--corect": isSuccess }
        )}
      >
        <label htmlFor={name} className="input__label">
          {label}
        </label>
        <input id={name} ref={ref} className="input__field" {...props} />
        <span className="input__icon">
          {isSuccess && <SuccessIcon />}
          {errors[name] && <ErrorIcon />}
        </span>
        {errors[name] && (
          <span className="input__message--danger">
            {errors[name]?.message}
          </span>
        )}
      </div>
    );
  }
);

export default Input;

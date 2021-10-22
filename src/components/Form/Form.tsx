import React from "react";
import { useFormContext } from "react-hook-form";

import { normalizeCardNumber } from "utils/normalizeCardNumber";
import { Input } from "../Input";
import { Button } from "../Button";
import { CardType } from "types";
import "./styles.scss";

export type FormType = Pick<
  CardType,
  "name" | "CVC" | "cardNumber" | "expireDate"
>;

interface FormProps {
  submit: (data: FormType) => void;
}
const Form: React.FC<FormProps> = ({ submit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset,
    watch,
  } = useFormContext<FormType>();

  const onSubmit = (data: FormType) => {
    console.log(data);
    submit(data);
    reset({ CVC: "", cardNumber: "", expireDate: "", name: "" });
  };

  console.log(watch(), isValid, errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flow-content">
      <Input
        {...register("name")}
        placeholder="John Doe"
        control={control}
        label="Name in card"
      />

      <Input
        label="Card number"
        control={control}
        {...register("cardNumber")}
        type="tel"
        placeholder="0000 0000 0000 0000"
        inputMode="numeric"
        autoComplete="cc-number"
        name="cardNumber"
        onChange={(event) => {
          const { value } = event.target;
          event.target.value = normalizeCardNumber(value);
        }}
      />

      <Input
        control={control}
        label="Expiry date"
        type="text"
        placeholder="00/00"
        {...register("expireDate")}
      />

      <Input
        control={control}
        label="CVC (Security code)"
        type="text"
        placeholder="000"
        maxLength={3}
        {...register("CVC")}
      />

      <Button className="m-b-4" disabled={!isValid} type="submit">
        Confirm
      </Button>
    </form>
  );
};

export default Form;

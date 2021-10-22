import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import valid from "card-validator";
import * as Yup from "yup";

import { CardType } from "types";

type FormType = Pick<CardType, "name" | "CVC" | "cardNumber" | "expireDate">;

const validationSchema: Yup.SchemaOf<FormType> = Yup.object().shape({
  cardNumber: Yup.string()
    .required()
    .test(
      "test-number",
      "Please enter a valid credit card number ",
      (value) => valid.number(value).isValid
    ),
  name: Yup.string().required("Please fill in your name"),
  expireDate: Yup.string()
    .required()
    .test(
      "test-expire-date",
      "Please enter a valid expiry date",
      (value) => valid.expirationDate(value).isValid
    ),
  CVC: Yup.string()
    .required()
    .test(
      "test-CVC",
      "Please enter a valid expiry date",
      (value) => valid.cvv(value).isValid
    ),
});

export const useCardForm = (initialValues?: FormType) => {
  const methods = useForm<FormType>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    ...(initialValues && { defaultValues: initialValues }),
  });

  return methods;
};

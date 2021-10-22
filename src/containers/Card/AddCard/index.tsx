import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { v4 } from "uuid";

import { useCardForm } from "hooks/useCardForm";
import { cardState } from "store/card";
import { CardType } from "types";

import { BottomSheet, Button, Form } from "components";

import { ReactComponent as CloseIcon } from "assets/svg/close.svg";

type FormType = Pick<
  CardType,
  "name" | "CVC" | "cardNumber" | "expireDate"
>;

export const AddCard = () => {
  const [open, setOpen] = useState(false);
  const methods = useCardForm();
  const setCard = useSetRecoilState(cardState);

  const handleSubmit = (values: FormType) => {
    setCard((oldCard) => [...oldCard, { id: v4(), ...values }]);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new card</Button>
      {open && (
        <BottomSheet>
          <div className="card-enter">
            <span onClick={() => setOpen(false)} className="card-enter__close">
              <CloseIcon fill="black" />
            </span>
            <h2 className="card-enter__title">Add your card details</h2>
            <FormProvider {...methods}>
              <Form submit={handleSubmit} />
            </FormProvider>
          </div>
        </BottomSheet>
      )}
    </>
  );
};

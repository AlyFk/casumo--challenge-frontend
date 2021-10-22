import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import cn from "classnames";

import { getCardByIDState, cardState } from "store/card";
import { useCardForm } from "hooks/useCardForm";
import { CardType } from "types";

import { BottomSheet, Form, Card, Button } from "components";

import { ReactComponent as EditIcon } from "assets/svg/edit-icon.svg";
import { ReactComponent as CloseIcon } from "assets/svg/close.svg";

type FormType = Pick<
  CardType,
  "name" | "CVC" | "cardNumber" | "expireDate"
>;

interface EditCardProps {
  id: string;
  className?: string;
}
export const EditCard: React.FC<EditCardProps> = ({ id, className }) => {
  const [open, setOpen] = useState(false);
  const setCard = useSetRecoilState(cardState);
  const card = useRecoilValue(getCardByIDState(id))!;
  const methods = useCardForm({ ...card });

  const handleSubmit = (values: FormType) => {
    setCard((oldCard) =>
      oldCard.map((item) =>
        item.id === card.id ? { id: card.id, ...values } : item
      )
    );
    setOpen(false);
  };

  const handleDelete = () => {
    setCard((oldCard) => oldCard.filter((item) => item.id !== card.id));
    setOpen(false);
  };
  return (
    <>
      <span
        className={cn({ [className!]: className })}
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </span>
      {open && (
        <BottomSheet>
          <div className="card-enter">
            <span onClick={() => setOpen(false)} className="card-enter__close">
              <CloseIcon fill="black" />
            </span>
            <h2 className="card-enter__title">Edit your card</h2>

            <Card
              CVC={methods.watch().CVC}
              cardNumber={methods.watch().cardNumber}
              expireDate={methods.watch().expireDate}
              name={methods.watch().name}
              className="m-b-8 m-x-auto"
            />
            <FormProvider {...methods}>
              <Form submit={handleSubmit} />
            </FormProvider>
            <Button color="secondary" onClick={handleDelete}>
              Delete card
            </Button>
          </div>
        </BottomSheet>
      )}
    </>
  );
};

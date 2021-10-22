import React from "react";
import { useRecoilValue } from "recoil";
import { cardState } from "store/card";
import { Card } from "components";
import { EditCard } from "../EditCard";
import "./styles.scss";
export const CardList = () => {
  const cards = useRecoilValue(cardState);
  return (
    <div className="card-list">
      <h1 className="card-list__title">Your cards</h1>
      <h4 className="card-list__description">
        Add, edit or delete your cards any time
      </h4>
      <div className="card-list__items">
        {cards.map(({ CVC, cardNumber, expireDate, id, name }) => (
          <div className="card-list__item" key={id}>
            <Card
              CVC={CVC}
              cardNumber={cardNumber}
              expireDate={expireDate}
              name={name}
            />
            <EditCard id={id} className="card-list__edit-item" />
          </div>
        ))}
      </div>
    </div>
  );
};

import React from "react";
import cn from "classnames";
import valid from "card-validator";

import { ReactComponent as MasterCardLogo } from "assets/svg/mastercard-logo.svg";
import { ReactComponent as VisaCardLogo } from "assets/svg/visa-logo.svg";
import masterCardShape from "assets/svg/master-card-shape.svg";
import visaCardShape from "assets/svg/visa-card-shape.svg";

import { CardType } from "types";
import "./styles.scss";

const CardLogo = {
  mastercard: { logo: MasterCardLogo, shape: masterCardShape },
  visa: { logo: VisaCardLogo, shape: visaCardShape },
};

export type CardProps = Pick<
  CardType,
  "name" | "CVC" | "cardNumber" | "expireDate"
> & { className?: string };

const Card: React.FC<CardProps> = ({
  CVC,
  name,
  expireDate,
  cardNumber,
  className,
}) => {
  const typeCard =
    (valid.number(cardNumber).card?.type as keyof typeof CardLogo) ??
    "mastercard";
  const Logo = CardLogo[typeCard].logo;
  const shape = CardLogo[typeCard].shape;
  return (
    <div className={cn("card", { [className!]: className })}>
      <div className={cn("card__container", `card--${typeCard}`)}>
        <div className="card__logo">
          <Logo />
        </div>
        <div className="card__cvc">
          <div className="card__title">CVC</div>
          {CVC}
        </div>
        <div className="card__expires">
          <div className="card__title">EXPIRES</div>
          {expireDate}
        </div>
        <div className="card__name">{name}</div>
        <div className="card__number">{cardNumber}</div>
        <img src={shape} className="card__shape" alt="card-shape" />
      </div>
    </div>
  );
};

export default Card;

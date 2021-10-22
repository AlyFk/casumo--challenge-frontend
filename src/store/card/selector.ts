import { selectorFamily } from "recoil";
import { cardState } from "./atom";

export const getCardByIDState = selectorFamily({
  key: "cardByID",
  get:
    (id) =>
    ({ get }) => {
      return get(cardState).find((item) => item.id === id);
    },
});

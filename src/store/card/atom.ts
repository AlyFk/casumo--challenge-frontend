import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CardType } from "types";

const { persistAtom } = recoilPersist();

export const cardState = atom<CardType[]>({
  key: "card",
  default: [] as CardType[],
  effects_UNSTABLE: [persistAtom],
});


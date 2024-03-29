import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const useFavoriteBooks = atom({
  key: "favoriteBooks",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

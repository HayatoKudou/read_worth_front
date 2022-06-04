import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const useImageSize = atom({
  key: "imageSize",
  default: {
    height: 300,
    width: 200,
  },
  effects_UNSTABLE: [persistAtom],
});

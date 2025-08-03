import { Dispatch, SetStateAction } from "react";

export type InputPropType<T> = {
  storageKey: T;
  setState: Dispatch<SetStateAction<T>>;
};

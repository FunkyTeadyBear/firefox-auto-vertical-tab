import { SetStateAction, Dispatch } from "react";
import { StorageType } from "./storage";

export type InputPropType<T> = {
  storageKey: T;
  setState: Dispatch<SetStateAction<T>>;
};

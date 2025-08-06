import { StorageType } from "./storage";

export type ConfigMessageType = {
  changedItem: keyof StorageType;
  newValue: StorageType[keyof StorageType];
};

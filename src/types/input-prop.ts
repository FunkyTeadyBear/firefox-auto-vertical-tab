import { MessageType } from "@/types/message";

export type InputPropType = MessageType & {
  isFirstRender: boolean;
};

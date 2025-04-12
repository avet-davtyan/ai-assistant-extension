import { z } from "zod";

export enum ActionType {
  CLOSE_TABS = "CLOSE_TABS",
}

export const ActionTypeEnum = z.nativeEnum(ActionType);
export type ActionTypeEnum = z.infer<typeof ActionTypeEnum>;

import { z } from "zod";

export enum ActionType {
  CLOSE_TABS = "CLOSE_TABS",
  OPEN_NEW_TAB = "OPEN_NEW_TAB",
  NAVIGATE_TO_TAB = "NAVIGATE_TO_TAB",
}

export const ActionTypeEnum = z.nativeEnum(ActionType);
export type ActionTypeEnum = z.infer<typeof ActionTypeEnum>;

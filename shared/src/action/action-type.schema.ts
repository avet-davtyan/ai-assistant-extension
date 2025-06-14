import { z } from "zod";

export enum ActionType {
  CLOSE_TABS = "CLOSE_TABS",
  OPEN_NEW_TAB = "OPEN_NEW_TAB",
  UPDATE_TAB = "UPDATE_TAB",
  GROUP_TABS = "GROUP_TABS",
}

export const ActionTypeEnum = z.nativeEnum(ActionType);
export type ActionTypeEnum = z.infer<typeof ActionTypeEnum>;

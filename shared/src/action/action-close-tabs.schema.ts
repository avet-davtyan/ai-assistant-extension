import { z } from "zod";
import { ActionType } from "./action-type.schema";

export const ActionCloseTabsDataSchema = z.object({
  tabIds: z.array(z.string()),
});

export const ActionCloseTabsSchema = z.object({
  actionType: z.literal(ActionType.CLOSE_TABS),
  actionData: ActionCloseTabsDataSchema,
});

export type ActionCloseTabsDataSchema = z.infer<typeof ActionCloseTabsDataSchema>;
export type ActionCloseTabsSchema = z.infer<typeof ActionCloseTabsSchema>;

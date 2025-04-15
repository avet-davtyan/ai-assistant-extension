import { z } from "zod";
import { ActionType } from "./action-type.schema";

export const ActionGroupTabsDataSchema = z.object({
  tabIds: z.array(z.number()),
});

export const ActionGroupTabsSchema = z.object({
  actionType: z.literal(ActionType.GROUP_TABS),
  actionData: ActionGroupTabsDataSchema,
});

export type ActionGroupTabsDataSchema = z.infer<typeof ActionGroupTabsDataSchema>;
export type ActionGroupTabsSchema = z.infer<typeof ActionGroupTabsSchema>;

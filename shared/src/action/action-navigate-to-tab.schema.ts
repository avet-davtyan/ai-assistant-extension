import { z } from "zod";
import { ActionType } from "./action-type.schema";

export const ActionNavigateToTabDataSchema = z.object({
  tabId: z.number(),
});

export const ActionNavigateToTabSchema = z.object({
  actionType: z.literal(ActionType.NAVIGATE_TO_TAB),
  actionData: ActionNavigateToTabDataSchema,
});

export type ActionNavigateToTabDataSchema = z.infer<typeof ActionNavigateToTabDataSchema>;
export type ActionNavigateToTabSchema = z.infer<typeof ActionNavigateToTabSchema>;

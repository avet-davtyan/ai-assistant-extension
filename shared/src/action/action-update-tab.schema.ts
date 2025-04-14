import { z } from "zod";
import { ActionType } from "./action-type.schema";

export const ActionUpdateTabDataSchema = z.object({
  tabId: z.number(),
  active: z.boolean().optional(),
  autoDiscardable: z.boolean().optional(),
  highlighted: z.boolean().optional(),
  muted: z.boolean().optional(),
  openerTabId: z.number().optional(),
  pinned: z.boolean().optional(),
  url: z.string().optional(),
});

export const ActionUpdateTabSchema = z.object({
  actionType: z.literal(ActionType.UPDATE_TAB),
  actionData: ActionUpdateTabDataSchema,
});

export type ActionUpdateTabDataSchema = z.infer<typeof ActionUpdateTabDataSchema>;
export type ActionUpdateTabSchema = z.infer<typeof ActionUpdateTabSchema>;

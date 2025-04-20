import { z } from "zod";
import { ActionType } from "./action-type.schema";

export const ActionOpenNewTabDataSchema = z.object({
  url: z.string().optional(),
});

export const ActionOpenNewTabSchema = z.object({
  actionType: z.literal(ActionType.OPEN_NEW_TAB),
  actionData: ActionOpenNewTabDataSchema,
});

export type ActionOpenNewTabDataSchema = z.infer<typeof ActionOpenNewTabDataSchema>;
export type ActionOpenNewTabSchema = z.infer<typeof ActionOpenNewTabSchema>;

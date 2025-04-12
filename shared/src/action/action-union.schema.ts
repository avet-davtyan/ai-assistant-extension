import { z } from "zod";
import { ActionCloseTabsSchema } from "./action-close-tabs.schema";
import { ActionOpenNewTabSchema } from "./action-open-new-tab.schema";

export const ActionUnionSchema = z.union([
  ActionCloseTabsSchema,
  ActionOpenNewTabSchema,
]);

export type ActionUnionSchema = z.infer<typeof ActionUnionSchema>;

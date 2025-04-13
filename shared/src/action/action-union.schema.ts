import { z } from "zod";
import { ActionCloseTabsSchema } from "./action-close-tabs.schema";
import { ActionOpenNewTabSchema } from "./action-open-new-tab.schema";
import { ActionNavigateToTabSchema } from "./action-navigate-to-tab.schema";

export const ActionUnionSchema = z.union([
  ActionCloseTabsSchema,
  ActionOpenNewTabSchema,
  ActionNavigateToTabSchema,
]);

export type ActionUnionSchema = z.infer<typeof ActionUnionSchema>;

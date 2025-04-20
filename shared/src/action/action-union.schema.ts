import { z } from "zod";
import { ActionCloseTabsSchema } from "./action-close-tabs.schema";
import { ActionOpenNewTabSchema } from "./action-open-new-tab.schema";
import { ActionUpdateTabSchema } from "./action-update-tab.schema";
import { ActionGroupTabsSchema } from "./action-group-tabs.schema";

export const ActionUnionSchema = z.union([
  ActionCloseTabsSchema,
  ActionOpenNewTabSchema,
  ActionUpdateTabSchema,
  ActionGroupTabsSchema,
]);

export type ActionUnionSchema = z.infer<typeof ActionUnionSchema>;

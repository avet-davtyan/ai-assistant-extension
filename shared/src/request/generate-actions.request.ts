import { z } from "zod";
import { TabUnionSchema } from "../tab";
import { GroupSchema } from "../group";

export const GenerateActionsRequestBody = z.object({
  prompt: z.string(),
  tabList: z.array(TabUnionSchema),
  groupList: z.array(GroupSchema),
});

export type GenerateActionsRequestBody = z.infer<typeof GenerateActionsRequestBody>;

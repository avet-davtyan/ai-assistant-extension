import { z } from "zod";
import { TabUnionSchema } from "../tab";

export const GenerateActionsRequestBody = z.object({
  prompt: z.string(),
  tabList: z.array(TabUnionSchema),
});

export type GenerateActionsRequestBody = z.infer<typeof GenerateActionsRequestBody>;

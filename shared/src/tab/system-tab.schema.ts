import { z } from "zod";
import { TabType } from "./tab-type.schema";

export const SystemTabDataSchema = z.object({
  url: z.string(),
});

export const SystemTabSchema = z.object({
  tabId: z.number(),
  tabType: z.literal(TabType.SYSTEM_TAB),
  tabData: SystemTabDataSchema,
});

export type SystemTabDataSchema = z.infer<typeof SystemTabDataSchema>;
export type SystemTabSchema = z.infer<typeof SystemTabSchema>;

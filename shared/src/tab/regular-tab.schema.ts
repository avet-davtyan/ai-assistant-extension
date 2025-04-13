import { z } from "zod";
import { TabType } from "./tab-type.schema";

export const RegularTabDataSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string(),
  textSnippet: z.string(),
});

export const RegularTabSchema = z.object({
  tabId: z.number(),
  tabType: z.literal(TabType.REGULAR_TAB),
  tabData: RegularTabDataSchema,
});

export type RegularTabDataSchema = z.infer<typeof RegularTabDataSchema>;
export type RegularTabSchema = z.infer<typeof RegularTabSchema>;

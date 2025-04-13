import { z } from "zod";

export enum TabType {
  REGULAR_TAB = "REGULAR_TAB",
  SYSTEM_TAB = "SYSTEM_TAB",
}

export const TabTypeEnum = z.nativeEnum(TabType);
export type TabTypeEnum = z.infer<typeof TabTypeEnum>;

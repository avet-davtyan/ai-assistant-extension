import { z } from "zod";
import { RegularTabSchema } from "./regular-tab.schema";
import { SystemTabSchema } from "./system-tab.schema";

export const TabUnionSchema = z.union([
  RegularTabSchema,
  SystemTabSchema,
]);

export type TabUnionSchema = z.infer<typeof TabUnionSchema>;

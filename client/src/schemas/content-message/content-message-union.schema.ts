import { z } from "zod";
import { CollectTabMessageSchema } from "./collect-tab-data.schema";

export const ContentMessageUnionSchema = z.union([
  CollectTabMessageSchema,
  //this must be removed
  CollectTabMessageSchema
]);

export type ContentMessageUnionSchema = z.infer<typeof ContentMessageUnionSchema>;

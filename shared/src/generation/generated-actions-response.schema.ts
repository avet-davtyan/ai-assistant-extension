import { z } from "zod";
import { ActionUnionSchema } from "../action";

export const GeneratedActionsResponseSchema = z.object({
  responseText: z.string(),
  generatedActionList: z.array(ActionUnionSchema),
});

export type GeneratedActionsResponseSchema = z.infer<typeof GeneratedActionsResponseSchema>;

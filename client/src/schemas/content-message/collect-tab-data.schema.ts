import { z } from "zod";
import { ContentMessageType } from "./content-message-type.schema";

export const CollectTabMessageDataSchema = z.object({});

export const CollectTabMessageSchema = z.object({
  contentMessageType: z.literal(ContentMessageType.COLLECT_TAB_DATA),
  contentMessageData: CollectTabMessageDataSchema,
});

export type CollectTabMessageDataSchema = z.infer<typeof CollectTabMessageDataSchema>;
export type CollectTabMessageSchema = z.infer<typeof CollectTabMessageSchema>;

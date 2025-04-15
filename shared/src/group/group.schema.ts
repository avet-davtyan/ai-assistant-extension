import { z } from "zod";

export const GroupSchema = z.object({
  groupId: z.number(),
  title: z.string().optional(),
  tabIds: z.array(z.number()),
});

export type GroupSchema = z.infer<typeof GroupSchema>;

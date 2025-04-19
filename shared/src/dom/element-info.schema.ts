import { z } from "zod";

export const ElementInfoSchema = z.object({
  id: z.string().nullable(),
  tag: z.string(),
  className: z.string().nullable(),
  name: z.string().nullable(),
  type: z.string().nullable(),
  role: z.string().nullable(),
  textContent: z.string().nullable(),
  children: z.array(z.lazy((): any => ElementInfoSchema)),
});

export type ElementInfoSchema = z.infer<typeof ElementInfoSchema>;

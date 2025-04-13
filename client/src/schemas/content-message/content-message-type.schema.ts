import { z } from "zod";

export enum ContentMessageType {
  COLLECT_TAB_DATA = "COLLECT_TAB_DATA",
}

export const ContentMessageTypeEnum = z.nativeEnum(ContentMessageType);
export type ContentMessageTypeEnum = z.infer<typeof ContentMessageTypeEnum>;

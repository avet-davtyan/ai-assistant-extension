import { ElementInfoSchema } from "@ai-assistant/shared";

export type HtmlElementGeneral = HTMLElement & HTMLInputElement
  & HTMLAnchorElement & HTMLImageElement & HTMLTextAreaElement;

export interface IElementInfoInternal {
  elementInfo: ElementInfoSchema;
  elementInfoStringified: string;
}

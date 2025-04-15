// import { RegularTabDataSchema } from "@ai-assistant/shared";
import { CollectTabMessageSchema } from "../../../schemas/content-message/collect-tab-data.schema";
import { ContentMessageType } from "../../../schemas/content-message/content-message-type.schema";
import { ContentMessageUnionSchema } from "../../../schemas/content-message/content-message-union.schema";

export class PopupEventHandler {

  public static instance: PopupEventHandler;

  public constructor() {

    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      return this.handlePopupEvent(request, sender, sendResponse);
    });
  }

  public static getInstance(): PopupEventHandler {
    if (!PopupEventHandler.instance) {
      PopupEventHandler.instance = new PopupEventHandler();
    }
    return PopupEventHandler.instance;
  }

  handlePopupEvent(
    request: unknown,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void,
  ) : boolean {
    let contentMessageUnionSchema: undefined | ContentMessageUnionSchema = undefined;

    try {
      contentMessageUnionSchema = ContentMessageUnionSchema.parse(request);
    } catch (error) {
      console.error("can't parse event", error);
      return false;
    }

    if (contentMessageUnionSchema === undefined) {
      return false;
    }

    if(contentMessageUnionSchema.contentMessageType === ContentMessageType.COLLECT_TAB_DATA) {
      return this.handleCollectTabData(contentMessageUnionSchema, sender, sendResponse);
    }

    return false;

  }

  handleCollectTabData(
    collectTabData: CollectTabMessageSchema,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void,
  ): boolean {
    console.log("collecting tab data", collectTabData);

    try {
      const safeGet = <T>(fn: () => T): T | null => {
        try {
          return fn();
        } catch {
          return null;
        }
      };

      const title = safeGet(() => document.title);
      const url = safeGet(() => window.location.href);
      const description = safeGet(() =>
        document.querySelector("meta[name='description']")?.getAttribute("content") || ""
      );

      const text = safeGet(() => document.body.innerText || "");
      const firstSentences =
        text
          ?.split(". ")
          .filter((s) => s.trim().length > 0)
          .slice(0, 3)
          .join(". ") || null;

      sendResponse({
        title,
        url,
        description,
        textSnippet: firstSentences,
        note: "Partial data collected. Some properties may be null due to tab restrictions.",
      });
    } catch (err) {
      sendResponse({
        error: "Data extraction failed",
        message: (err as Error).message,
      });
    }

    return true;
  }

}

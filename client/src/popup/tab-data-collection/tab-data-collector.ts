import { RegularTabDataSchema, RegularTabSchema, SystemTabSchema, TabType, TabUnionSchema } from "@ai-assistant/shared";
import { CollectTabMessageSchema } from "../../schemas/content-message/collect-tab-data.schema";
import { ContentMessageType } from "../../schemas/content-message/content-message-type.schema";
import { z } from "zod";

export class TabDataCollector {

  public static instance: TabDataCollector;
  private readonly systemTabUrlList = [
    "chrome:",
    "chrome-extension:",
    "devtools:",
    "about:",
  ];

  public constructor() {
  }

  public static getInstance(): TabDataCollector {
    if (!TabDataCollector.instance) {
      TabDataCollector.instance = new TabDataCollector();
    }
    return TabDataCollector.instance;
  }

  async collectDataFromAllTabs(): Promise<TabUnionSchema[]> {
    return new Promise((resolve) => {
      chrome.tabs.query({}, (tabs) => {

        const tabDataPromises = tabs.map((tab) => {
          return new Promise((resolveTab) => {

            if(
              tab.id === undefined ||
              tab.url === undefined
            ) {
              return resolveTab(null);
            }

            const isSystemTab =
              this.systemTabUrlList.some(scheme => tab.url!.startsWith(scheme));

            if (isSystemTab) {

              const systemTabSchema: SystemTabSchema = {
                tabId: tab.id,
                tabType: TabType.SYSTEM_TAB,
                tabData: {
                  url: tab.url,
                }
              }
              return resolveTab(systemTabSchema);
            }

            const message: CollectTabMessageSchema = {
              contentMessageType: ContentMessageType.COLLECT_TAB_DATA,
              contentMessageData: {},
            };

            chrome.tabs.sendMessage(tab.id, message, (response) => {
              if (chrome.runtime.lastError || !response) {
                console.warn(`Could not reach tab ${tab.id}: ${chrome.runtime.lastError?.message}`);
                return resolveTab(null);
              }

              let regularTabDataSchema: undefined | RegularTabDataSchema = undefined;

              try {
                regularTabDataSchema = RegularTabDataSchema.parse(response);
              } catch (error) {
                console.warn(`Could not parse tab ${tab.id} data: ${error}`);
                return resolveTab(null);
              }

              if(regularTabDataSchema === undefined) { return resolveTab(null); }
              if(tab.id === undefined) { return resolveTab(null); }

              const regularTabSchema: RegularTabSchema = {
                tabId: tab.id,
                tabType: TabType.REGULAR_TAB,
                tabData: regularTabDataSchema,
              }

              resolveTab(regularTabSchema);
            });
          });
        });

        Promise.all(tabDataPromises).then((results) => {
          const filteredResults = results.filter((r) => r !== null);
          const tabUnionSchemaList = z.array(TabUnionSchema).parse(filteredResults);
          resolve(tabUnionSchemaList);
        });
      });
    });
  }

}

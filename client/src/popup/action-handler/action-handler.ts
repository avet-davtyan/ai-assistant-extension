import { ActionCloseTabsSchema, ActionNavigateToTabSchema, ActionOpenNewTabSchema, ActionType, ActionUnionSchema } from "@ai-assistant/shared";
import { z } from "zod";

export class GeneratedActionHandler {

  public static instance: GeneratedActionHandler;

  public constructor() {
  }

  public static getInstance(): GeneratedActionHandler {
    if (!GeneratedActionHandler.instance) {
      GeneratedActionHandler.instance = new GeneratedActionHandler();
    }
    return GeneratedActionHandler.instance;
  }

  async handleGeneratedActions(
    actionList: unknown,
  ) {
    console.log("handling generated actions", actionList);

    let actionSchemaList: undefined | ActionUnionSchema[] = undefined;
    try {
      actionSchemaList = await z.array(ActionUnionSchema).parseAsync(actionList);
    } catch {
      console.error("can't parse event");
    }

    if (actionSchemaList === undefined) {
      return;
    }

    for(const actionSchema of actionSchemaList) {
      if(actionSchema.actionType === ActionType.OPEN_NEW_TAB) {
        await this.handleOpenNewTabAction(actionSchema);
      }
      if(actionSchema.actionType === ActionType.NAVIGATE_TO_TAB) {
        await this.handleNavigateToTabAction(actionSchema);
      }
      if(actionSchema.actionType === ActionType.CLOSE_TABS) {
        await this.handleCloseTabsAction(actionSchema);
      }
    }
  }

  private handleOpenNewTabAction(
    action: ActionOpenNewTabSchema,
  ) {
    console.log("opening new tab", action);

    chrome.tabs.create({
      url: action.actionData.url,
    });
  }

  private handleNavigateToTabAction(
    action: ActionNavigateToTabSchema,
  ) {
    console.log("navigating to tab", action);

    const { tabId } = action.actionData;
    chrome.tabs.update(tabId, { active: true });
  }

  private handleCloseTabsAction(
    action: ActionCloseTabsSchema,
  ) {
    console.log("closing tabs", action);

    chrome.tabs.remove(action.actionData.tabIds);
  }
}

import {
  ActionCloseTabsSchema,
  ActionOpenNewTabSchema,
  ActionType,
  ActionUnionSchema,
  ActionUpdateTabSchema,
  GeneratedActionsResponseSchema,
} from "@ai-assistant/shared";

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
    responseSchema: unknown,
  ) {
    console.log("handling generated actions", responseSchema);

    let actionSchemaList: undefined | ActionUnionSchema[] = undefined;
    try {
      const generatedActionsResponseSchema =
        await GeneratedActionsResponseSchema.parseAsync(responseSchema);
      actionSchemaList = generatedActionsResponseSchema.generatedActionList;
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
      if(actionSchema.actionType === ActionType.UPDATE_TAB) {
        await this.handleUpdateTabAction(actionSchema);
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

  private handleUpdateTabAction(
    action: ActionUpdateTabSchema,
  ) {
    console.log("updating tab", action);

    const {
      tabId,
      active,
      autoDiscardable,
      highlighted,
      muted,
      openerTabId,
      pinned,
      url,
    } = action.actionData;

    chrome.tabs.update(
      tabId,
      {
        active,
        autoDiscardable,
        highlighted,
        muted,
        openerTabId,
        pinned,
        url,
      },
    );
  }

  private handleCloseTabsAction(
    action: ActionCloseTabsSchema,
  ) {
    console.log("closing tabs", action);

    chrome.tabs.remove(action.actionData.tabIds);
  }
}

import { ActionOpenNewTabSchema, ActionType, ActionUnionSchema } from "@ai-assistant/shared";
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
    }
  }

  private handleOpenNewTabAction(
    action: ActionOpenNewTabSchema,
  ) {
    console.log("opening new tab", action);

    chrome.tabs.create({});
  }

}

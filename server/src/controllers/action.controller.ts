import {
  ActionNavigateToTabSchema,
  ActionOpenNewTabSchema,
  ActionType,
  GenerateActionsRequestBody,
} from "@ai-assistant/shared";
import {
  Request,
  Response,
} from "express";

export const generateActions = async (req: Request, res: Response) => {

  try {
    const requestBody = await GenerateActionsRequestBody.parseAsync(req.body);
    const { tabList } = requestBody;

    const actionOpenNewTab: ActionOpenNewTabSchema = {
      actionType: ActionType.OPEN_NEW_TAB,
      actionData: {url: undefined},
    }

    const navigateToTab: ActionNavigateToTabSchema = {
      actionType: ActionType.NAVIGATE_TO_TAB,
      actionData: {
        tabId: tabList[0].tabId,
      },
    }
    res.json([actionOpenNewTab, actionOpenNewTab, navigateToTab]);

  } catch {
    res.send(400);
  }
};

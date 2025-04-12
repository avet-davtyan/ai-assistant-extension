import {
  ActionOpenNewTabSchema,
  ActionType,
} from "@ai-assistant/shared";
import {
  Request,
  Response,
} from "express";

export const generateActions = (req: Request, res: Response) => {
  const actionOpenNewTab: ActionOpenNewTabSchema = {
    actionType: ActionType.OPEN_NEW_TAB,
    actionData: {},
  }
  res.json([actionOpenNewTab, actionOpenNewTab]);
};

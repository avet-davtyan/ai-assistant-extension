import {
  GenerateActionsRequestBody,
} from "@ai-assistant/shared";
import {
  Request,
  Response,
} from "express";
import { GenerationService } from "../generation/generation.service";

export const generateActions = async (req: Request, res: Response) => {

  const generationService = GenerationService.getInstance();

  try {
    const requestBody = await GenerateActionsRequestBody.parseAsync(req.body);
    const {
      prompt,
      tabList,
      groupList,
    } = requestBody;

    const response =
      await generationService.generateActionGenerationResponse(
        {
          prompt,
          tabList,
          groupList,
        }
      );

    res.json(response);

  } catch {
    res.send(400);
  }
};

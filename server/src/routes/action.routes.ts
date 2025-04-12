import { ActionRoutes } from "@ai-assistant/shared";
import { Router } from "express";
import { generateActions } from "../controllers/action.controller";

const router = Router();

router.post(ActionRoutes.generateActions, generateActions);

export default router;

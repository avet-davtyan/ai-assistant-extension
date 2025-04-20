import { ActionBaseRoute } from "@ai-assistant/shared";
import { Router } from "express";
import actionRoutes from "./action.routes";

const router = Router();

router.use(ActionBaseRoute, actionRoutes);

export default router;

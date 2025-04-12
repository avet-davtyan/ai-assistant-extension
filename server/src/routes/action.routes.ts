import { Router } from "express";
import { generateActions } from "../controllers/action.controller";

const router = Router();

router.post("/generate-actions", generateActions);

export default router;

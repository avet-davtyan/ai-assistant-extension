import express from "express";
import { envConfig } from "./env";
import actionRoutes from "./routes/action.routes";

envConfig("../.env");

const app = express();

app.use(express.json());
app.use("/api/action", actionRoutes);

export default app;

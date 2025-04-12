import express from "express";
import { envConfig } from "./env";
import apiRoutes from "./routes/api.routes";

envConfig("../.env");

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

export default app;

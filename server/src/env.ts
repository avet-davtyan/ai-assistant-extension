import { config } from "dotenv";
import { z } from "zod";

const EnvVariablesSchema = z.object({
  SERVER_PORT: z.string().default("3000"),
  OPENAI_API_KEY: z.string(),
})

export function envConfig(path: string): void {
  config({ path });
}

envConfig("../.env");

const ENV = EnvVariablesSchema.parse(process.env);

export default ENV;

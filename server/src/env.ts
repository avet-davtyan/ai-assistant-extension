import { config } from "dotenv";

interface IEnvVariables {
  SERVER_PORT: string,
}
export let ENV: IEnvVariables;

export function envConfig(path: string): void {
  config({ path });
}

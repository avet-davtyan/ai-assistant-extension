import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";
import esbuild from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });

esbuild
  .build({
    entryPoints: {
      "content": "src/content.ts",
      "popup": "src/popup.ts",
      "background": "src/background.ts",
    },
    bundle: true,
    platform: "browser",
    target: "es2016",
    sourcemap: true,
    outdir: "dist/",
    outbase: ".",
    entryNames: "[name]",
    define: {
      "process.env.API_URL": JSON.stringify(process.env.API_URL),
    },
  })
  .then(() => {
    console.log("Build completed!");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });

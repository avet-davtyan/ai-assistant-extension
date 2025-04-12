import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: {
      "content": "src/content.ts",
      "popup": "src/popup.ts"
    },
    bundle: true,
    platform: "browser",
    target: "es2016",
    sourcemap: true,
    outdir: "dist/",
    outbase: ".",
    entryNames: "[name]",
  })
  .then(() => {
    console.log("Build completed!");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });

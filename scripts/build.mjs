import path from "path";
import { build } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const libraries = [
  {
    entry: path.resolve(__dirname, "../src/main.ts"),
    name: "Stelo",
    fileName: (format) => `stelo.${format}.js`,
    formats: ["iife", "umd", "es"],
  },
];

libraries.forEach(async (library) => {
  await build({
    build: {
      outDir: "./dist",
      lib: {
        ...library,
      },
      emptyOutDir: false,
    },
  });
});

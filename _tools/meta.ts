import { BuildOptions } from "https://deno.land/x/dnt@0.37.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: "both",
  entryPoints: ["./mod.ts", "./polyfill.ts"],
  outDir: "./npm",
  package: {
    name: "@miyauci/upsert",
    version,
    description: "Maps for emplace, TC39 proposal-upsert implementation",
    keywords: [
      "upsert",
      "map",
      "weak-map",
      "insert",
      "update",
      "tc39",
      "proposal-upsert",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/upsert",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/upsert.git",
    },
    bugs: {
      url: "https://github.com/TomokiMiyauci/upsert/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: { access: "public" },
  },
  packageManager: "pnpm",
});

import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["index.ts", "infra/**", "products/domain/**", "products/useCases/**"],
  target: "es2023",
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  minify: false,
})

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/utah-calendar-element.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});

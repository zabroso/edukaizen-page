import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

const BASE = import.meta.env.BASE;

export default defineConfig({
  output: "server",
  integrations: [tailwind(), react()],
  adapter: node({
    mode: "standalone",
  }),
});
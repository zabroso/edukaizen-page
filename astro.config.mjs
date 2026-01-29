import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://zabroso.github.io",
  base: "/edukaizen_page/",
  integrations: [tailwind(), react()],
});
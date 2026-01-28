import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
const repository_name = import.meta.env.REPOSITORY_NAME;

export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://zabroso.github.io',
  base: repository_name
});
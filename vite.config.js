import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        business: resolve(__dirname, 'business.html'),
        company: resolve(__dirname, 'company.html'),
        solution: resolve(__dirname, 'solution.html'),
        project: resolve(__dirname, 'project.html'),
        careers: resolve(__dirname, 'careers.html'),
      },
    },
  },
});

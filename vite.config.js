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
        investment: resolve(__dirname, 'investment.html'),
        mutual: resolve(__dirname, 'mutual.html'),
        sales: resolve(__dirname, 'sales.html'),
        asset: resolve(__dirname, 'asset.html'),
        clients: resolve(__dirname, 'clients.html'),
        axlab: resolve(__dirname, 'ax-lab.html'),
        ailab: resolve(__dirname, 'ai-lab.html'),
      },
    },
  },
});

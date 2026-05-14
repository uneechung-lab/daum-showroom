import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
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
        ceo: resolve(__dirname, 'ceo.html'),
        history: resolve(__dirname, 'history.html'),
        vision: resolve(__dirname, 'vision.html'),
        contact: resolve(__dirname, 'contact.html'),
        overview: resolve(__dirname, 'overview.html'),
        'careers-jobs': resolve(__dirname, 'careers-jobs.html'),
        'careers-process': resolve(__dirname, 'careers-process.html'),
        'careers-welfare': resolve(__dirname, 'careers-welfare.html'),
        'careers-announcement': resolve(__dirname, 'careers-announcement.html'),
        'apply': resolve(__dirname, 'apply.html'),
      },
    },
  },
});

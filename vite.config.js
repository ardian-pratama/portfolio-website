import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [react(), sitemap({
      hostname: "https://ardian-pratama.vercel.app",
      changefreq: "daily",
      priority: 1.0,  
    }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

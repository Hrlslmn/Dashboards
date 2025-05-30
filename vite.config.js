import { defineConfig } from "vite";

export default defineConfig({
    server:{
        host: true,
    },
    plugins: [React()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
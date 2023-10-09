import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: process.env.IS_DEV !== 'true' ? './' : '/',
  build: {
    outDir: 'dist',
  },
});
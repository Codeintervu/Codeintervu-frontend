import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:5000",
        target: "https://codeintervu-backend.onrender.com",
        changeOrigin: true,
      },
    },
  },
});

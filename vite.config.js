import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy configuration removed - now handled dynamically in api.js
  },
});

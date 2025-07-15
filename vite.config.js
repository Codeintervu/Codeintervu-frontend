import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  plugins: [react()],
  // Removed proxy configuration since we're using deployed backend
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:5000",
  //   },
  // },
});

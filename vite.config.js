import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** @type {import('tailwindcss').Config} */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          editor: ["@monaco-editor/react"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['monaco-editor'],
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      'path': 'path-browserify',
      'fs': false,
      'crypto': false,
    }
  },
  // Removed proxy configuration since we're using deployed backend
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:5000",
  //   },
  // },
});

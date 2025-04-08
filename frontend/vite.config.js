import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxInject: 'import React from "react"', // Ensure React is always available in JSX files
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Make sure to resolve JSX files
  },
});

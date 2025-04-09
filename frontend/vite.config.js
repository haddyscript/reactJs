import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxInject: 'import React from "react"', // always available in JSX files
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // resolve JSX files
    alias: {
      path: 'path-browserify'
    }
  },
});

/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const isStorybook = process.env.STORYBOOK_ENV?.trim() === 'storybook';

export default defineConfig({
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "**/*.scss, **/*.css", "**/*.ttf"]
  },
  css: {
    modules: {
      exportGlobals: true,
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    babel({
      babelConfig: {
        presets: [
          ["@babel/preset-env", {"modules": false}],
          ["@babel/preset-react", {"runtime": "automatic"}],
          ["@babel/preset-typescript", {"allExtensions": true, "isTSX": true}],
          ["solid", { "generate": "ssr", "hydratable": true }]
        ],
        rootMode: "upward"
      }
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.json')
    })
  ],
  build: {
    lib: {
      entry: {
        cms: resolve(__dirname, 'src/index.ts')
      },
      name: 'BunnyWebCMS',
      formats: ['es'],
      fileName: format => `bunny-web-cms.${format}.js`
    },
    rollupOptions: {
      external: !isStorybook ? ['react', 'react-dom', ...Object.keys(peerDependencies)] : [],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    }
  }
});
import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import dts from 'vite-plugin-dts';

const dirname = path.dirname(fileURLToPath(import.meta.url));

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            react({
                jsxRuntime: 'automatic',
            }), 
            babel(),
            dts({
                insertTypesEntry: true
            }),
            // storybookTest({
            //   configDir: path.join(dirname, '.storybook'),
            //   storybookScript: 'yarn storybook --no-open',
            // }),
          ],
          test: {
            globals: true,
            isolate: true,
            environment: 'jsdom',
            name: 'storybook',
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright({}),
              headless: true,
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['./.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  }),
);
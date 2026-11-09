import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: process.env.DESIGN_PACKAGE_RESULTS,
  timeout: 45000,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:5193',
    headless: true,
    actionTimeout: 10000,
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:5193',
    reuseExistingServer: false,
  },
});

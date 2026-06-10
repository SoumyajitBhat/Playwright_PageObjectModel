// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 5 minutes per test
  timeout: 300 * 1000,

  expect: {
    timeout: 10000,
  },

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  use: {
    video: 'on',

    trace: 'on-first-retry',

    // Realistic browser profile
    viewport: {
      width: 1366,
      height: 768,
    },

    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',

    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--no-sandbox'
      ]
    }
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],

        viewport: {
          width: 1366,
          height: 768,
        },

        userAgent:
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
      },
    },
  ],
});
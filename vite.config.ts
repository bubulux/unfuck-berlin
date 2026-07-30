/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
// import { playwright } from '@vitest/browser-playwright';
// const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// const CALENDAR_ICS_PATH = '/calendar/ical/volteuropa.org_3qtptk1l0mfg76gq9nfqq1h4mg%40group.calendar.google.com/public/basic.ics'

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  // Dev-only proxy: mirrors the Netlify rewrite so /api/volt-calendar works the
  // same locally (avoids the Google Calendar CORS block).
  // server: {
  //   proxy: {
  //     '/api/volt-calendar': {
  //       target: 'https://calendar.google.com',
  //       changeOrigin: true,
  //       secure: true,
  //       rewrite: () => CALENDAR_ICS_PATH,
  //     },
  //   },
  // },
  // test: {
  //   projects: [{
  //     extends: true,
  //     plugins: [
  //     // The plugin will run tests for the stories defined in your Storybook config
  //     // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
  //     storybookTest({
  //       configDir: path.join(dirname, '.storybook')
  //     })],
  //     test: {
  //       name: 'storybook',
  //       browser: {
  //         enabled: true,
  //         headless: true,
  //         provider: playwright({}),
  //         instances: [{
  //           browser: 'chromium'
  //         }]
  //       }
  //     }
  //   }]
  // }
});

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--headless=new');
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--disable-infobars');
          launchOptions.args.push('--window-size=1920,1080');
        }
        return launchOptions;
      });
    },
    baseUrl: "https://www.lacoste.com",
    specPattern: 'cypress/e2e/**/*.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 30000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    experimentalModifyObstructiveThirdPartyCode: true
  },
});

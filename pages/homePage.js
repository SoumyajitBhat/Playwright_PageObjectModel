const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.checkYourRateCTA = page
      .locator('a:has-text("Check your rate")')
      .first();
  }

  async clickCheckYourRateCTA() {
    await expect(this.checkYourRateCTA).toBeVisible();
    await this.checkYourRateCTA.click();
  }
};
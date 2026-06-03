const { expect } = require("@playwright/test");

exports.AssetPage = class AssetPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.assetInput = page.getByRole('combobox');
    this.assetValueInput = page.locator('[id="asset[0].assetvalue"]');
    this.allDoneButton = page.getByRole('button', { name: 'All done' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async verifyAssetPage() {
    await this.page.waitForURL("**/verify/assets");
    await expect(this.assetInput).toBeVisible();
  }

  async fillAssetDetails({ asset, assetValue }) {
    await this.assetInput.selectOption({label: asset});
    await this.assetValueInput.fill(assetValue);
    await this.allDoneButton.click();
    await this.continueButton.click();
  }
};

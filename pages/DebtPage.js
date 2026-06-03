const { expect } = require("@playwright/test");

exports.DebtPage = class DebtPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.liabilityProviderDropdown = page.locator('select[name="liabilities[0].Provider__c"]');
    this.liabilityTypeDropdown = page.locator('select[name="liabilities[0].Liabilities__c"]');
    this.liabilityValueInput = page.locator('[id="liabilities[0].Liability_Value__c"]');
    this.allDoneButton = page.getByRole('button', { name: 'All done' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.allDoneConfirmationButton = page.getByTitle('All Done');
  }

  async verifyDebtPage() {
    await this.page.waitForURL("**/verify/liabs");
    await expect(this.liabilityProviderDropdown).toBeVisible();
  }

  async fillDebtDetails({ liabilityProvider, liabilityType, debtValue }) {
    await this.liabilityProviderDropdown.selectOption(liabilityProvider);
    await this.liabilityTypeDropdown.selectOption({label: liabilityType});
    await this.liabilityValueInput.fill(debtValue);
    await this.allDoneButton.click();
    await this.continueButton.click();
    await this.allDoneConfirmationButton.click();
  }
};

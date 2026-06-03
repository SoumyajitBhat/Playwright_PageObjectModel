const { expect } = require("@playwright/test");

exports.IncomeDetailsPage = class IncomeDetailsPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.incomeInput = page.locator('[id="Income[0].genesis__Amount__c"]');
    this.frequencyDropdown = page.locator('select[name="Income[0].genesis__Frequency__c"]');
    this.allDoneButton = page.getByRole('button', { name: 'All done' });
    this.incomeDecreaseExpectedDropdown = page.getByRole('combobox');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async verifyIncomeDetailsPage() {
    await this.page.waitForURL("**/verify/income");
    await expect(this.incomeInput).toBeVisible();
  }

  async fillIncomeDetails({ incomeValue, frequency, incomeDecreaseExpected }) {
    await this.incomeInput.fill(incomeValue);
    await this.frequencyDropdown.selectOption({ label: frequency });
    await this.allDoneButton.click();
    await this.incomeDecreaseExpectedDropdown.selectOption(incomeDecreaseExpected);
    await this.continueButton.click();
  }
};

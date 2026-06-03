const { expect } = require("@playwright/test");

exports.ExpencesPage = class ExpencesPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.mortgagePaymentsInput = page.locator('#Rent_mortgage_and_or_board_payments__c');
    this.frequencyDropdown = page.locator('select[name="Rent_mortgage_and_or_board_payments_fre__c"]');
    this.estimatedLivingCostDropdown = page.locator('select[name="autoLivingCost"]');
    this.expenseIncreaseExpectedDropdown = page.locator('select[name="Expect_expense_increase__c"]');
  }

  async verifyExpencesPage() {
    await this.page.waitForURL("**/verify/expenses");
    await expect(this.mortgagePaymentsInput).toBeVisible();
  }

  async fillExpencesDetails({ mortgagePayments, frequency, isEstimatedLivingCostCorrect, isExpenseIncreaseExpected }) {
    await this.mortgagePaymentsInput.fill(mortgagePayments);
    await this.frequencyDropdown.selectOption({label: frequency});
    await this.estimatedLivingCostDropdown.selectOption(isEstimatedLivingCostCorrect);
    await this.expenseIncreaseExpectedDropdown.selectOption(isExpenseIncreaseExpected);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
};

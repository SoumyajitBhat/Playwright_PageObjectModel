const { expect } = require("@playwright/test");

exports.BankDetailsPage = class BankDetailsPage {
  constructor(page) {
    this.page = page;

    // Frame
    this.bankPageFrame = page
      .locator('iframe[title="CS-iframe"]')
      .contentFrame();
    // Locators
    this.bankNameInput = this.bankPageFrame.getByRole("textbox", {
      name: "Bank name",
    });
    this.bankNameOption = this.bankPageFrame.locator(
      "(//div[text()='Dummy - Standard'])[1]",
    );
    this.catalogInput = this.bankPageFrame.getByRole("textbox", {
      name: "Catalog",
    });
    this.passwordInput = this.bankPageFrame.getByRole("textbox", {
      name: "Password",
    });
    this.submitDetailsButton = this.bankPageFrame.locator("id=submitdetails");
    this.iAgreeButton = this.bankPageFrame.getByRole("button", {
      name: "I Agree",
    });
  }

  async verifyBankDetailsPage() {
    await this.page.waitForURL("**/verify/bankhist");
    await expect(this.bankNameInput).toBeVisible();
  }

  async fillBankDetails({ bankName, catalog, password }) {
    await this.bankNameInput.fill(bankName);
    await this.bankNameOption.click();
    await this.catalogInput.fill(catalog);
    await this.passwordInput.pressSequentially(password, {
      delay: 100,
    });
    await this.submitDetailsButton.click();
    await this.iAgreeButton.click();
    await this.page.waitForTimeout(5000); // waits for 5 seconds
  }
};

const { expect } = require("@playwright/test");

exports.SignupPage = class SignupPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#password_confirmation');
    this.termsCheckbox = page.getByText('I have read and agree to');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    
  }

  async verifySignupPage() {
    await this.page.waitForURL("**/apply/id/sign-up");
    await expect(this.passwordInput).toBeVisible();
  }

  async fillPassword({password}) {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.termsCheckbox.click();
    await this.submitButton.click();
  }
};

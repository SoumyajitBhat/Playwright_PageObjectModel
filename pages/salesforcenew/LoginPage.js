import { expect } from "@playwright/test";
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = "https://devorg--nectardev.sandbox.my.salesforce.com/";

    // Locators
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Log In to Sandbox' });
    this.otpInput = page.getByRole('textbox', { name: 'Verification Code' });
    this.verifyButton = page.getByRole('button', { name: 'Verify' });
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);  
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  async verifyOTPPage() {
    await expect(this.otpInput).toBeVisible();
  }
  
  async enterOTPandVerify(otp) {
    await this.otpInput.fill(otp);
    await this.verifyButton.click();
  }
}
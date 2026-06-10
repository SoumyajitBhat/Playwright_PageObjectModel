import { expect } from "@playwright/test";
export class OTPPage {
  
  constructor(page) {
    this.page = page;

    // Locators
    this.otpInput = page.getByRole('textbox', { name: 'Verification Code' });
    this.verifyButton = page.getByRole('button', { name: 'Verify' });
  }

  async verifyOTPPage() {
      await expect(this.otpInput).toBeVisible();
  }

  async enterOTPandVerify(otp) {
    await this.otpInput.fill(otp);
    await this.verifyButton.click();
  }
}
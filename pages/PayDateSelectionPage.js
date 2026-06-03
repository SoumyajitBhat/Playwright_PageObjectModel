import { expect } from "@playwright/test";

export class PayDateSelectionPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.dateInput = page.getByRole('textbox');
    this.dateValue = page.locator("//td[@class='rdtDay rdtActive']");
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async verifyPayDateSelectionPage() {
    await this.page.waitForURL("**/verify/paydate");
    await expect(this.dateInput).toBeVisible();
  }

  async fillPayDateDetails() {
    await this.page.getByRole('textbox').click();
    await this.page.locator("//td[@class='rdtDay rdtActive']").click();
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }
};

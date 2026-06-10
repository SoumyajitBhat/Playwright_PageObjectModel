import { expect } from "@playwright/test";

export class QuotationPendingPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.quotationPendingPageHeading = page.getByRole('heading', { name: 'Quotation pending' });
  }

  async verifyQuotationPendingPage() {
    await this.page.waitForURL("**/verify/pending");
    await expect(this.quotationPendingPageHeading).toBeVisible();
    await this.page.waitForTimeout(5000); // waits for 5 seconds
  }

};

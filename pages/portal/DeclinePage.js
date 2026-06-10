import { expect } from "@playwright/test";

export class DeclinePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.declineMessage = page.getByRole('heading', { name: 'At this stage we have to' });
  }

  async verifyDeclinePage() {
    await this.page.waitForURL("**/getcash/decline");
    await expect(this.declineMessage).toBeVisible();
  }
}

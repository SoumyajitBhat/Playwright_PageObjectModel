import { expect } from "@playwright/test";
export class HomePage {
  
  constructor(page) {
    this.page = page;

    // Locators
    this.servicingConfig = page.getByRole('link', { name: 'Servicing Configuration' });
  }

  async verifyHomePage() {
      await this.page.waitForURL("**/home/home.jsp");
  }

  async clickServicingConfig() {
    await this.servicingConfig.click();
    await this.page.waitForTimeout(5000); // waits for 5 seconds
  }
}
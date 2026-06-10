import { expect } from "@playwright/test";

export class ApexJobPage {
  constructor(page) {
    this.page = page;
    this.url = "https://devorg--nectardev.sandbox.my.salesforce.com/apexpages/setup/listAsyncApexJobs.apexp?retURL=%2Fui%2Fsetup%2FSetup%3Fsetupid%3DMonitoring&setupid=AsyncApexJobs";

    // Locators
    this.locClosureDynamicJob = page.getByRole("link", { name: "LocClosureDynamicJob" });
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async verifyApexJobPage() {
    await this.page.waitForURL("**/apexpages/setup/listAsyncApexJobs.apexp*");
  }

  async visibilityOfLocClosureDynamicJob() {
    for (let i = 0; i < 20; i++) {
      await this.page.reload();
      await this.page.waitForTimeout(10000);
      if (await this.locClosureDynamicJob.isVisible()) {
        break;
      }
    }
  }
}

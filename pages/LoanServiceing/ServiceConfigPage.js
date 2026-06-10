import { expect } from "@playwright/test";
import { SodEodPage } from "./SodEodPage";
export class ServiceConfigPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.sodeodProcess = page.getByRole("link", { name: "SOD/EOD Process" });
  }

  async verifyServiceConfigPage() {
    await this.page.waitForURL(
      "**/apex/organizationPreference?sfdc.tabName=01r280000008IZ2",
    );
  }

  async clickSODEODProcess() {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      await this.sodeodProcess.click(),
    ]);
    await newPage.waitForLoadState();
    return new SodEodPage(newPage);
  }
}

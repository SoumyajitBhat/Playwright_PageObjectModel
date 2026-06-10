export class HomePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.servicingConfig = page.getByRole('link', { name: 'Servicing Configuration' });
    this.clContracts = page.getByRole('link', { name: 'CL Contracts' });
  }

  async verifyHomePage() {
      await this.page.waitForURL("**/home/home.jsp");
  }

  async clickServicingConfig() {
    await this.servicingConfig.click();
  }

  async clickCLContracts() {
    await this.clContracts.click();
  }
}
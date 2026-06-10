import { expect } from "@playwright/test";
export class CLContractPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.searchBox = this.page.getByRole('combobox', { name: 'Search...' });
    this.contractLink = this.page.getByRole('link', { name: 'LAI-' });
    this.nextDueDate = this.page.locator("//span[text()='Next Due Date']/ancestor::td[1]/following-sibling::td[1]/div");
    this.status = this.page.locator("//span[text()='Status']/ancestor::td[1]/following-sibling::td[1]/div");
    this.disbursalStatus = this.page.locator("//span[text()='Disbursal Status']/ancestor::td[1]/following-sibling::td[1]/div");
    this.periodicFeeSetup = this.page.locator('td.rich-tab-header').filter({ hasText: 'Periodic Fee Setup' });
    this.activeCheckboxInPeriodicFeeSetup = this.page.locator("//div[text()='Active']/ancestor::thead[1]/following-sibling::tbody//img[contains(@id,'chkbox')]");
    this.automatedPaymentSetups = this.page.locator('td.rich-tab-header').filter({ hasText: 'Automated Payment Setups' });
    this.activeCheckboxInAPS = this.page.locator("//th[text()='Active']/ancestor::tr[1]/following-sibling::tr//img[@class='checkImg']");
  }

  async verifyCLContractPage() {
    await this.page.waitForURL("**/a1h/o");
  }

  async clickCLContract(CLContractId) {
    await this.searchBox.fill(CLContractId);
    await this.searchBox.press('Enter');
    await this.contractLink.click();
  }
  
  async verifyCLContractDetails() {
    await this.page.waitForURL("**/apex/tabbedLoanAccount*");
    const nextDueDate = await this.nextDueDate.textContent();
    expect(nextDueDate?.trim()).toBe('31/01/2026');
  }

  async verifyCLContractStatus() {
    const status = await this.status.textContent();
    expect(status?.trim()).toBe('Active - Good Standing');
  }

  async verifyCLContractDisbursalStatus() {
    const disbursalStatus = await this.disbursalStatus.textContent();
    expect(disbursalStatus?.trim()).toBe('Fully Disbursed');
  }
  async periodicFeeSetupValidation() {
    await this.periodicFeeSetup.click();
    const isActive = await this.activeCheckboxInPeriodicFeeSetup.getAttribute('title');
    expect(isActive).toBe('Checked');
  }
  async automatedPaymentSetupsValidation() {
    await this.automatedPaymentSetups.click();
    const isActive = await this.activeCheckboxInAPS.getAttribute('title');
    expect(isActive).toBe('Checked');
  }

}

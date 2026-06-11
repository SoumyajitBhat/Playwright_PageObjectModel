export class TransactionSummaryPage {
  constructor(page) {
    this.page = page;

    // Locators
    
  }

  async verifyTransactionSummaryPage() {
    await this.page.waitForURL('**/apex/TransactionSummaryClassic*');
  }

}
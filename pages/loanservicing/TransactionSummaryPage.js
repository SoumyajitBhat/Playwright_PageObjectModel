export class TransactionSummaryPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.startDate = this.page.getByRole('textbox', { name: 'Start Date' });
    this.endDate = this.page.getByRole('textbox', { name: 'End Date' });
    this.header = this.page.getByRole('heading', { name: /LAI/ });
    this.transactionSummaryTable =this.page.locator("//div[@class='datatable-container']//table");
    this.transactionSummaryHeaderCells =this.transactionSummaryTable.locator('thead th');
    this.transactionSummaryRows =this.transactionSummaryTable.locator('tbody tr[role="row"]');
  }

  async verifyTransactionSummaryPage() {
    await this.page.waitForURL('**/apex/TransactionSummaryClassic*');
  }

  async selectStartDate(date) {
    await this.startDate.fill(date);
  }

  async selectEndDate(date) {
    await this.endDate.fill(date);
  }
  
  async clickHeader() {
    await this.header.click();
    await this.page.waitForTimeout(5000);
  }

  async verifyTopTransactionTypeColumnValue(transactionType,columnName,expectedValue) {
    // Find target column index
    let targetColumnIndex = -1;
    const headerCount = await this.transactionSummaryHeaderCells.count();
    for (let i = 0; i < headerCount; i++) {
      const headerText = (await this.transactionSummaryHeaderCells.nth(i).textContent())?.trim();
      if (headerText.toLowerCase() === columnName.toLowerCase()) {
        targetColumnIndex = i;
        break;
      }
    }

    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    const rowCount = await this.transactionSummaryRows.count();
    for (let r = 0; r < rowCount; r++) {
      const row = this.transactionSummaryRows.nth(r);
      const allCells = row.locator('th, td');
      const transactionTypeText = (await allCells.nth(2).textContent())?.trim();
      if (transactionTypeText === transactionType) {
        const actualValue = (await allCells.nth(targetColumnIndex).textContent())?.trim() || '';
        const status =actualValue === expectedValue ? 'PASS' : 'FAIL';
        console.log(`Status: ${status} | Transaction Type: '${transactionType}' | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
        return;
      }
    }
    throw new Error(`Transaction Type '${transactionType}' not found`);
  }
}
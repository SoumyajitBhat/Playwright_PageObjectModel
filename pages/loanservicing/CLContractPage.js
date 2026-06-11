import { expect } from "@playwright/test";
import { TransactionSummaryPage } from "./TransactionSummaryPage";
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
    this.feeSetupTable = this.page.locator('table[id*="feeSetupTable"]');
    this.feeSetupTableHeaderCells = this.feeSetupTable.locator('thead th');
    this.feeSetupTableRows = this.feeSetupTable.locator('tbody tr');
    this.automatedPaymentSetups = this.page.locator('td.rich-tab-header').filter({ hasText: 'Automated Payment Setups' });
    this.automatedPaymentSetupTable = this.page.locator('table.list:has(th:text-is("Automated Payment Setup Name"))');
    this.automatedPaymentSetupHeaderCells = this.automatedPaymentSetupTable.locator('tr.headerRow th');
    this.automatedPaymentSetupRows = this.automatedPaymentSetupTable.locator('tbody tr.dataRow');
    this.transactions = this.page.getByText('Transactions', { exact: true });
    this.fundingTab=this.page.locator('td.rich-tab-header').filter({ hasText: /^Funding$/ });    
    this.loanDisbursalTransactionTable = this.page.locator('table.list:has(th:text-is("Loan Disbursal Transaction ID"))');
    this.loanDisbursalTransactionHeaderCells = this.loanDisbursalTransactionTable.locator('tr.headerRow th');
    this.loanDisbursalTransactionRows = this.loanDisbursalTransactionTable.locator('tr.dataRow');
    this.chargesTab=this.page.locator('td.rich-tab-header').filter({ hasText: /^Charges$/ });
    this.chargesTable = page.locator('table.list:has(th:text-is("Charge Id"))');
    this.chargesTableHeaderCells = this.chargesTable.locator('tr.headerRow th');
    this.chargesTableRows = this.chargesTable.locator('tr.dataRow');
    this.billsTab=this.page.locator('td.rich-tab-header').filter({ hasText: /^Bill\(s\)$/ });
    this.billsTable = page.locator('table.list:has(th:text-is("Due Id"))');
    this.billsTableHeaderCells = this.billsTable.locator('tr.headerRow th');
    this.billsTableRows = this.billsTable.locator('tr.dataRow');
    this.paymentTab=this.page.locator('td.rich-tab-header').filter({ hasText: /^Payment\(s\)$/ });
    this.loanPaymentTransactionTable = this.page.locator('td[id*=tabPayment] table.list:has(th:text-is("Loan Payment Transaction ID"))');
    this.loanPaymentTransactionHeaderCells = this.loanPaymentTransactionTable.locator('tr.headerRow th');
    this.loanPaymentTransactionRows = this.loanPaymentTransactionTable.locator('tr.dataRow');
    this.accountStatement=this.page.getByRole('link', { name: 'Account Statement' });
    this.transactionSummary=this.page.locator('a:text-is("Transaction Summary")');
    this.transactionSummaryFrame=this.page.frameLocator('#mfiflexIframeView');
    this.transactionSummaryPageHeader=this.transactionSummaryFrame.getByRole('heading', { name: /Transaction history/ });
    this.transactionSummaryTable =this.transactionSummaryFrame.locator('#txnSummaryPage\\:j_id47\\:txnSummaryPBId\\:txnTable');
    this.transactionSummaryHeaderCells = this.transactionSummaryTable.locator('thead th');
    this.transactionSummaryRows = this.transactionSummaryTable.locator('tbody tr');
    this.closeTransactionSummary=this.page.locator('#closeModalButton');
    this.txnSummaryButton=this.page.getByRole('button', { name: 'TxnSummary' }).first();
    this.detailsTab=this.page.getByText('Details', { exact: true });
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
  }

  async verifyNextDueDate(date) {
    await this.nextDueDate.scrollIntoViewIfNeeded();
    const nextDueDate = await this.nextDueDate.textContent();
    expect(nextDueDate?.trim()).toBe(date);
  }

  async verifyCLContractStatus(contractStatus) {
    await this.status.scrollIntoViewIfNeeded();
    const status = await this.status.textContent();
    expect(status?.trim()).toBe(contractStatus);
  }

  async verifyCLContractDisbursalStatus(disbursalStatus) {
    await this.disbursalStatus.scrollIntoViewIfNeeded();
    const disbursalStatusText = await this.disbursalStatus.textContent();
    expect(disbursalStatusText?.trim()).toBe(disbursalStatus);
  }

  async clickPeriodicFeeSetup() {
    await this.periodicFeeSetup.click();
  }

  async verifyValueByRowAndColumnofFeeTable(rowValue, columnName, expectedValue) {
    // Find the target column index
    const headers = this.feeSetupTableHeaderCells;
    let targetColumnIndex = -1;
    for (let i = 0; i < await headers.count(); i++) {
    const headerText = (await headers.nth(i).textContent())?.trim();
      if (headerText === columnName) {
        targetColumnIndex = i;
        break;
      }
    }
    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    // Find the matching row
    const rows = this.feeSetupTableRows;
    for (let r = 0; r < await rows.count(); r++) {
      const row = rows.nth(r);
      // Fee column is currently the 3rd column (index 2)
      const feeCellText = (await row.locator('td').nth(2).textContent())?.trim();
      if (feeCellText === rowValue) {
        const targetCell = row.locator('td').nth(targetColumnIndex);
        let actualValue = (await targetCell.textContent())?.trim();
        // If cell text is empty, try title attribute
        if (!actualValue) {
          const elementWithTitle = targetCell.locator('[title]').first();
          if (await elementWithTitle.count()) {
            actualValue = await elementWithTitle.getAttribute('title');
          }
        }
        // Handle case where neither text nor title exists
        actualValue = actualValue || '';
        const status = actualValue === expectedValue ? 'PASS' : 'FAIL';
        console.log(`Status: ${status} | Row: '${rowValue}' | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
        return;
      }
    }
    throw new Error(`Row with Fee '${rowValue}' not found`);
  }

  async clickAutomatedPaymentSetups() {
    await this.automatedPaymentSetups.click();
  }

  async verifyAutomatedPaymentSetupColumnValue(columnName, expectedValue) {
    const headers = this.automatedPaymentSetupHeaderCells;
    let targetColumnIndex = -1;
    // Find column index
    for (let i = 0; i < await headers.count(); i++) {
      const headerText = (await headers.nth(i).textContent())?.trim();
      if (headerText === columnName) {
        targetColumnIndex = i;
        break;
      }
    }
    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    const row = this.automatedPaymentSetupRows.first();
    // Include both th and td because Salesforce mixes them
    const cells = row.locator('th, td');
    const targetCell = cells.nth(targetColumnIndex);
    let actualValue = (await targetCell.textContent())?.trim();
    // If text is empty, try title attribute
    if (!actualValue) {
      const elementWithTitle = targetCell.locator('[title]').first();
      if (await elementWithTitle.count()) {
        actualValue = await elementWithTitle.getAttribute('title');
      }
    }
    actualValue = actualValue || '';
    const status = actualValue === expectedValue ? 'PASS' : 'FAIL';
    console.log(`Status: ${status} | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
  }

  async clickTransactionsTab() {
    await this.transactions.click();
  }

  async verifyLoanDisbursalTransactionColumnValue(columnName, expectedValue) {
    const headers = this.loanDisbursalTransactionHeaderCells;
    let targetColumnIndex = -1;
    for (let i = 0; i < await headers.count(); i++) {
      const headerText = (await headers.nth(i).textContent())?.trim();
      if (headerText === columnName) {
        targetColumnIndex = i;
        break;
      }
    }
    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    const row = this.loanDisbursalTransactionRows.first();
    // Salesforce tables contain both th and td in data rows
    const cells = row.locator('th, td');
    const targetCell = cells.nth(targetColumnIndex);
    let actualValue = (await targetCell.textContent())?.trim();
    if (!actualValue) {
      const elementWithTitle = targetCell.locator('[title]').first();
      if (await elementWithTitle.count()) {
        actualValue = await elementWithTitle.getAttribute('title');
      }
    }
    actualValue = actualValue || '';
    const status =actualValue === expectedValue ? 'PASS' : 'FAIL';
    console.log(`Status: ${status} | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
  }

  async clickFundingTab() {
    await this.fundingTab.click();
  }

  async clickChargesTab() {
    await this.chargesTab.click();
  }

  async verifyValueByRowAndColumnofChargesTable(rowValue, columnName, expectedValue) {
    // Find target column index
    const headers = this.chargesTableHeaderCells;
    let targetColumnIndex = -1;
    for (let i = 0; i < await headers.count(); i++) {
      const headerText = (await headers.nth(i).textContent())?.trim();
      if (headerText === columnName) {
        targetColumnIndex = i;
        break;
      }
    }
    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    const rows = this.chargesTableRows;
    for (let r = 0; r < await rows.count(); r++) {
      const row = rows.nth(r);
      // Data row contains both th and td
      const cells = row.locator('th, td');
      // Fee column is the 5th displayed column
      // Action=0, Charge Id=1, Created Date=2, Date=3, Fee=4
      const feeCellText = (await cells.nth(4).textContent())?.trim();
      if (feeCellText === rowValue) {
        const targetCell = cells.nth(targetColumnIndex);
        let actualValue = (await targetCell.textContent())?.trim();
        // Fallback to title attribute
        if (!actualValue) {
          const elementWithTitle =targetCell.locator('[title]').first();
          if (await elementWithTitle.count()) {
            actualValue = await elementWithTitle.getAttribute('title');
          }
        }
        actualValue = actualValue || '';
        const status = actualValue === expectedValue ? 'PASS' : 'FAIL';
        console.log(`Status: ${status} | Row: '${rowValue}' | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
        return;
      }
    }
    throw new Error(`Row with Fee '${rowValue}' not found`);
  }

  async clickBillsTab() {
    await this.billsTab.click();
  }

  async verifyBillsTableTopRowColumnValue(columnName, expectedValue) {
    const headers = this.billsTableHeaderCells;
    let targetColumnIndex = -1;
    // Find column index
    for (let i = 0; i < await headers.count(); i++) {
      const headerText = (await headers.nth(i).textContent())?.trim();
      if (headerText === columnName) {
        targetColumnIndex = i;
        break;
      }
    }
    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    // Get first (top) row only
    const topRow = this.billsTableRows.first();
    // Salesforce data rows contain both th and td
    const cells = topRow.locator('th, td');
    const targetCell = cells.nth(targetColumnIndex);
    let actualValue = (await targetCell.textContent())?.trim();
    // Fallback to title attribute (for checkbox columns)
    if (!actualValue) {
      const elementWithTitle = targetCell.locator('[title]').first();
      if (await elementWithTitle.count()) {
        actualValue = await elementWithTitle.getAttribute('title');
      }
    }
    actualValue = actualValue || '';
    const status =actualValue === expectedValue ? 'PASS' : 'FAIL';

    console.log(`Status: ${status} | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
  }

  async clickPaymentTab() {
    await this.paymentTab.click();
  }

  async verifyLoanPaymentTransactionColumnValue(transactionDate,columnName,expectedValue) {
    // Find target column index
    const headers = await this.loanPaymentTransactionHeaderCells;
    let targetColumnIndex = -1;
    for (let i = 0; i < await headers.count(); i++) {
      const headerText = (await headers.nth(i).textContent())?.trim();
      if (headerText === columnName) {
        targetColumnIndex = i;
        break;
      }
    }
    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    // Find matching row by Transaction Date
    const rows = await this.loanPaymentTransactionRows;
    for (let r = 0; r < await rows.count(); r++) {
      const row = rows.nth(r);
      // Transaction Date = 4th displayed column
      // Row contains: td(Action), th(ID), td(Payment Mode), td(Transaction Date)
      const rowTransactionDate =(await row.locator('td').nth(2).textContent())?.trim();
      if (rowTransactionDate === transactionDate) {
        const allCells = row.locator('th, td');
        const targetCell = allCells.nth(targetColumnIndex);
        let actualValue =(await targetCell.textContent())?.trim() || '';
        if (!actualValue) {
          const elementWithTitle = targetCell.locator('[title]').first();
          if (await elementWithTitle.count()) {
            actualValue =(await elementWithTitle.getAttribute('title')) || '';
          }
        }
        const status =actualValue === expectedValue ? 'PASS' : 'FAIL';
        console.log(`Status: ${status} | Transaction Date: '${transactionDate}' | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
        if (status === 'FAIL') {
          throw new Error(`Validation failed for Transaction Date '${transactionDate}', Column '${columnName}'. Expected '${expectedValue}' but found '${actualValue}'`);
        }
        return;
      }
    }
    throw new Error(`Row with Transaction Date '${transactionDate}' not found`);
  }

  async clickAccountStatement() {
    await this.accountStatement.click();
  }

  async clickTransactionSummary() {
    await this.transactionSummary.click();
  }

  async verifyTransactionSummaryPage() {
    await expect(this.transactionSummaryPageHeader).toBeVisible();

  }

  async verifyTransactionSummaryBottomRowColumnValue(columnName, expectedValue) {
    // Find column index
    const headers = await this.transactionSummaryHeaderCells;
    let targetColumnIndex = -1;
    for (let i = 0; i < await headers.count(); i++) {
      const headerText = (await headers.nth(i).textContent())?.trim();
      if (headerText === columnName) {
        targetColumnIndex = i;
        break;
      }
    }
    if (targetColumnIndex === -1) {
      throw new Error(`Column '${columnName}' not found`);
    }
    // Get bottom row
    const rows = this.transactionSummaryRows;
    const lastRow = rows.last();
    // Header uses <th>, rows use only <td>
    const targetCell = lastRow.locator('td').nth(targetColumnIndex);
    const actualValue = (await targetCell.textContent())?.trim() || '';
    const status = actualValue === expectedValue ? 'PASS' : 'FAIL';
    console.log(`Status: ${status} | Column: '${columnName}' | Actual Value: '${actualValue}' | Expected Value: '${expectedValue}'`);
    if (status === 'FAIL') {
      throw new Error(`Validation failed for column '${columnName}'. Expected '${expectedValue}' but found '${actualValue}'`);
    }
  }
  
  async clickCloseTransactionSummary() {
    this.page.once('dialog', async dialog => {
      console.log(`Dialog detected: ${dialog.type()} - ${dialog.message()}`);
      await dialog.accept();
    });

    await this.closeTransactionSummary.click({
      force: true,
      noWaitAfter: true
    });
  }

  async clickDetailsTab() {
    await this.detailsTab.click();
  }

  async clickTxnSummaryButton() {
      const [newPage] = await Promise.all([
        this.page.waitForEvent("popup"),
        await this.txnSummaryButton.click(),
      ]);
      await newPage.waitForLoadState();
      return new TransactionSummaryPage(newPage);
    }
}

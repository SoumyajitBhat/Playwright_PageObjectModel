export class SodEodPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.currentDateText = page.locator('iframe[name="06628000004Q6Ds"]').contentFrame().getByText(/\w{3} \d{1,2}, \d{4} \(Day Started\)/);
    this.dateField =page.getByRole('textbox', { name: 'Move System Date to (Future/' })
    this.sodEodHeading =page.getByRole('heading', { name: 'SOD-EOD Process' })
    this.moveToDateButton = page.getByRole('button', { name: 'Move to Date' });
  }

  async verifySodEodPage() {
    await this.page.waitForURL('**/apex/multipleBranchDayProcess');
  }
  
    async getCurrentSystemDateText() {
    const text = await this.currentDateText.textContent();
    return text?.trim();
  }

  async getCurrentSystemDate() {
    const dateText = await this.getCurrentSystemDateText();
    const dateString =dateText?.match(/[A-Za-z]{3}\s\d{1,2},\s\d{4}/)?.[0];
    if (!dateString) {
      throw new Error(`Unable to extract system date. Actual text: ${dateText}`);
    }
    return new Date(dateString);
  }

  formatDate(date) {
    return [
      String(date.getDate()).padStart(2, "0"),
      String(date.getMonth() + 1).padStart(2, "0"),
      date.getFullYear()
    ].join("/");
  }

  async calculateFutureDate(daysToAdd) {
    const currentDate = await this.getCurrentSystemDate();
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return this.formatDate(currentDate);
  }

  async enterFutureDate(daysToAdd) {
    const futureDate = await this.calculateFutureDate(daysToAdd);
    await this.dateField.fill(futureDate);
    await this.sodEodHeading.click();
    return futureDate;
  }

  async clickMoveToDate() {
    await this.moveToDateButton.click();
  }

  async waitForDayStarted(expectedDate, maxAttempts = 5) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await this.page.reload();
      await this.page.waitForLoadState("networkidle");
      const dateText = await this.getCurrentSystemDateText();
      if (dateText?.includes("(Day Started)")) {
        const extractedDate =dateText.match(/[A-Za-z]{3}\s\d{1,2},\s\d{4}/)?.[0];
        if (extractedDate) {
          const actualDate = this.formatDate(new Date(extractedDate));
          if (actualDate === expectedDate) {
            console.log(`Date matched on attempt ${attempt}: ${dateText}`);
            return;
          }
        }
      }
      console.log(`Attempt ${attempt}: Current="${dateText}" Expected="${expectedDate} (Day Started)"`);
      if (attempt < maxAttempts) {
        await this.page.waitForTimeout(60000);
      }
    }

    throw new Error(`Date did not update to ${expectedDate} after ${maxAttempts} attempts`);
  }

  async moveSystemDateToFuture(daysToAdd) {
    const futureDate = await this.enterFutureDate(daysToAdd);
    await this.clickMoveToDate();
    await this.waitForDayStarted(futureDate);
  }
}
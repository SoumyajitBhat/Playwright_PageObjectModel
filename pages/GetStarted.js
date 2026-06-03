const { expect } = require("@playwright/test");

exports.GetStartedPage = class GetStartedPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.GetStartedPageHeading = page.getByText('Let’s get started. How much')
    this.slider = page.locator(".rangeslider");
    this.sliderHandle = page.locator(".rangeslider__handle");
    this.manualEntryOption = page.getByRole('heading', { name: 'Or manually enter your amount' });
    this.loanAmountInput = page.locator("#manualAmount");
    this.loanPurposeDropdown = page.getByRole("combobox");
    this.emailInput = page.locator("#Email");
    this.confirmEmailInput = page.locator("#email");
    this.mobilePhoneInput = page.locator("#MobilePhone");
    this.continueButton = page.getByRole("button", {name: "Continue",});
  }
  getSliderAmount(amount) {
   return this.page.getByText(amount.toString(), { exact: true });
}

  async setLoanAmount(targetAmount) {
    const minAmount = 2000;
    const maxAmount = 50000;

    const sliderBox = await this.slider.boundingBox();
    const handleBox = await this.sliderHandle.boundingBox();

    if (!sliderBox || !handleBox) {
      throw new Error("Slider or slider handle not found");
    }

    const percentage =
      (targetAmount - minAmount) / (maxAmount - minAmount);

    const targetX = sliderBox.x + sliderBox.width * percentage;
    const centerY = handleBox.y + handleBox.height / 2;

    await this.page.mouse.move(
      handleBox.x + handleBox.width * 0.75,
      centerY
    );
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, centerY, { steps: 20 });
    await this.page.mouse.up();
  }

  async verifyGetStartedPage() {
    await this.page.waitForURL("**/apply/getstarted");
    await expect(this.GetStartedPageHeading).toBeVisible();
  }

  async fillGetStartedForm({amount,loanPurpose,email,phone}) {
    await this.manualEntryOption.click();
    await this.loanAmountInput.clear();
    await this.loanAmountInput.fill(amount);
    await expect(this.getSliderAmount(amount)).toBeVisible();
    await this.loanPurposeDropdown.selectOption({label: loanPurpose,});
    await this.emailInput.fill(email);
    await this.confirmEmailInput.fill(email);
    await this.mobilePhoneInput.fill(phone);
    await this.continueButton.click();
  }
};
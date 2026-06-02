const { expect } = require("@playwright/test");

exports.GetStartedPage = class GetStartedPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.slider = page.locator(".rangeslider");
    this.sliderHandle = page.locator(".rangeslider__handle");
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

  async fillGetStartedForm() {
    await this.page.waitForURL("**/apply/getstarted");
  }
};
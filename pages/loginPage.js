exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://staging.xag.co.nz/';

    // Locators
    this.passwordInput = page.locator('[type="password"]');
    this.submitButton = page.locator('[type="submit"]');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(password) {
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
};
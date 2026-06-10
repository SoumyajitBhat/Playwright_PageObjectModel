export class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = "https://devorg--nectardev.sandbox.my.salesforce.com/";

    // Locators
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Log In to Sandbox' });
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);  
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
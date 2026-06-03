import { expect } from "@playwright/test";

export class UserDetailsPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.firstNameInput = page.locator('#FirstName');
    this.middleNameInput = page.locator('#MiddleName');
    this.lastNameInput = page.locator('#LastName');
    this.genderDropdown = page.locator('select[name="peer__Gender__c"]');
    this.dayDropdown = page.locator('select[name="date"]');
    this.monthDropdown = page.locator('select[name="month"]');
    this.yearDropdown = page.locator('select[name="year"]');
    this.driverLicenceInput = page.locator('#DriverLicenceNo');
    this.driverLicenceVersionInput = page.locator('#DriverLicenceVersion');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

  }

  async verifyUserDetaildsPage() {
    await this.page.waitForURL("**/apply/id");
    await expect(this.firstNameInput).toBeVisible();
  }

  async fillUserDetails({ firstName, middleName, lastName, gender, day, month, year, driverLicence, driverLicenceVersion }) {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.genderDropdown.selectOption(gender);
    await this.dayDropdown.selectOption(day);
    await this.monthDropdown.selectOption(month);
    await this.yearDropdown.selectOption(year);
    await this.driverLicenceInput.fill(driverLicence);
    await this.driverLicenceVersionInput.fill(driverLicenceVersion);
    await this.continueButton.click();
  }
}

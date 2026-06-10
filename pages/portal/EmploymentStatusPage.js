import { expect } from "@playwright/test";

export class EmploymentStatusPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.incomeTypeDropdown = page.locator('select[name="Incometype"]');
    this.incomeTypeSpecificationDropdown = page.locator('select[name="IncmTypeSpecification"]');
    this.currentJobDurationDropdown = page.locator('select[name="Currentjobduration"]');
    this.howDidYouHearAboutUsDropdown = page.locator('select[name="Survey"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    
  }

  async verifyEmploymentStatusPage() {
    await this.page.waitForURL("**/apply/income");
    await expect(this.incomeTypeDropdown).toBeVisible();
  }

  async fillEmploymentDetails({employmentStatus,employmentType,currentJobDuration,howDidYouHearAboutUs}) {
    await this.incomeTypeDropdown.selectOption({label: employmentStatus});
    await this.incomeTypeSpecificationDropdown.selectOption({label: employmentType});
    await this.currentJobDurationDropdown.selectOption({label: currentJobDuration});
    await this.howDidYouHearAboutUsDropdown.selectOption({label: howDidYouHearAboutUs});
    await this.continueButton.click();
  }
};

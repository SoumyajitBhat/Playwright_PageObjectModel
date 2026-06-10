import { expect } from "@playwright/test";

export class AddressDetailsPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.addressInput = page.getByRole('combobox').filter({ hasText: /^$/ });
    this.residentialStatusDropdown = page.locator('select[name="ResidentialStatus"]');
    this.currentAddressDurationDropdown = page.locator('select[name="Currentaddressduration"]');
    this.relationshipStatusDropdown = page.locator('select[name="Relationshipstatus"]');
    this.noOfDependentsInput = page.locator('#Noofdependents');
    this.permanentCitizenOfNZDropdown = page.locator('select[name="PermanentcitizenofNZ"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    
  }

  async verifyAddressDetailsPage() {
    await this.page.waitForURL("**/apply/details");
    await expect(this.addressInput).toBeVisible();
  }

  async fillAddressDetails({address,residentialStatus,currentAddressDuration,relationshipStatus,noOfDependents,permanentCitizenOfNZ}) {
    await this.addressInput.fill(address);
    await this.page.getByText(address).click();
    await this.residentialStatusDropdown.selectOption({label: residentialStatus});
    await this.currentAddressDurationDropdown.selectOption({label: currentAddressDuration});
    await this.relationshipStatusDropdown.selectOption({label: relationshipStatus});
    await this.noOfDependentsInput.fill(noOfDependents);
    await this.permanentCitizenOfNZDropdown.selectOption({label: permanentCitizenOfNZ});
    await this.continueButton.click();
  }
};

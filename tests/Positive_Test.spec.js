import { test } from "@playwright/test";
import { LoginPage } from "../pages/portal/LoginPage.js";
import { HomePage } from "../pages/portal/HomePage.js";
import { GetStartedPage } from "../pages/portal/GetStarted.js";
import { UserDetailsPage } from "../pages/portal/UserDetailsPage.js";
import { SignupPage } from "../pages/portal/SignupPage.js";
import { AddressDetailsPage } from "../pages/portal/AddressDetailsPage.js";
import { EmploymentStatusPage } from "../pages/portal/EmploymentStatusPage.js";
import { BankDetailsPage } from "../pages/portal/BankDetailsPage.js";
import { AssetPage } from "../pages/portal/AssetPage.js";
import { DebtPage } from "../pages/portal/DebtPage.js";
import { ExpencesPage } from "../pages/portal/ExpencesPage.js";
import { IncomeDetailsPage } from "../pages/portal/IncomeDetailsPage.js";
import { PayDateSelectionPage } from "../pages/portal/PayDateSelectionPage.js";
import { QuotationPendingPage } from "../pages/portal/QuotationPendingPage.js";

test("Successful login validation", async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);
  const getStarted = new GetStartedPage(page);
  const userDetails = new UserDetailsPage(page);
  const signup = new SignupPage(page);
  const addressDetails = new AddressDetailsPage(page);
  const employmentStatus = new EmploymentStatusPage(page);
  const bankDetails = new BankDetailsPage(page);
  const assetPage = new AssetPage(page);
  const debtPage = new DebtPage(page);
  const expencesPage = new ExpencesPage(page);
  const incomeDetailsPage = new IncomeDetailsPage(page);
  const payDateSelectionPage = new PayDateSelectionPage(page);
  const quotationPendingPage = new QuotationPendingPage(page);

  await login.navigate();
  await login.login("6Q83gs@&r");
  await home.clickCheckYourRateCTA();
  await getStarted.verifyGetStartedPage();
  // await getStarted.setLoanAmount(20000);

  const randomEmail = `testemail${Math.floor(10000 + Math.random() * 90000)}@yopmail.com`;
  const phoneNumber = `02${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;

  await getStarted.fillGetStartedForm({ amount: "$10,000", loanPurpose: "Home improvement", email: randomEmail, phone: phoneNumber, });

  const randomdriverLicence = `AB${Math.floor(100000 + Math.random() * 900000)}`;

  await userDetails.verifyUserDetailsPage();
  await userDetails.fillUserDetails({ firstName: "CkTester", middleName: "One", lastName: "MaskedLabel", gender: "Male", day: "15", month: "3", year: "1989", driverLicence: randomdriverLicence, driverLicenceVersion: "121" });
  await signup.verifySignupPage();
  await signup.fillPassword({ password: "Nectar1234###" });
  await addressDetails.verifyAddressDetailsPage();

  // const letter = 'ABCDEF'[Math.floor(Math.random() * 6)];
  // const randomAddress = `${Math.floor(1 + Math.random() * 9)}${letter} Alpha Avenue, Coastlands, Whakatane 3120`;

  await addressDetails.fillAddressDetails({ address: "8 Alpha Avenue, Coastlands, Whakatane 3120", residentialStatus: "Own", currentAddressDuration: "2 years +", relationshipStatus: "Single", noOfDependents: "0", permanentCitizenOfNZ: "Yes" });
  await employmentStatus.verifyEmploymentStatusPage();
  await employmentStatus.fillEmploymentDetails({ employmentStatus: "Full-time", employmentType: "Office employment", currentJobDuration: "2 years +", howDidYouHearAboutUs: "Facebook" });
  await bankDetails.verifyBankDetailsPage();

  await bankDetails.fillBankDetails({bankName: "Dummy - Standard",catalog: "cs.testh",password: "cs.testh"});
  await assetPage.verifyAssetPage();
  await assetPage.fillAssetDetails({asset: "House", assetValue: "300000"});
  await debtPage.verifyDebtPage();
  await debtPage.fillDebtDetails({liabilityProvider: "AMEX", liabilityType: "Personal Loan", debtValue: "1000"});
  await expencesPage.verifyExpencesPage();
  await expencesPage.fillExpencesDetails({mortgagePayments: "19", frequency: "Weekly", isEstimatedLivingCostCorrect: "Yes", isExpenseIncreaseExpected: "No"});
  await incomeDetailsPage.verifyIncomeDetailsPage();
  await incomeDetailsPage.fillIncomeDetails({incomeValue: "70000", frequency: "Monthly", incomeDecreaseExpected: "No"});
  await payDateSelectionPage.verifyPayDateSelectionPage();
  await payDateSelectionPage.fillPayDateDetails();
  await quotationPendingPage.verifyQuotationPendingPage();
});

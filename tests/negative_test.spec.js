import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { GetStartedPage } from "../pages/GetStarted.js";
import { UserDetailsPage } from "../pages/UserDetailsPage.js";
import { SignupPage } from "../pages/SignupPage.js";
import { AddressDetailsPage } from "../pages/AddressDetailsPage.js";
import { EmploymentStatusPage } from "../pages/EmploymentStatusPage.js";
import { DeclinePage } from "../pages/DeclinePage.js";

test("Successful login validation", async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);
  const getStarted = new GetStartedPage(page);
  const userDetails = new UserDetailsPage(page);
  const signup = new SignupPage(page);
  const addressDetails = new AddressDetailsPage(page);
  const employmentStatus = new EmploymentStatusPage(page);
  const declinePage = new DeclinePage(page);

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
  await userDetails.fillUserDetails({ firstName: "CkTester", middleName: "One", lastName: "MaskedLabel", gender: "Male", day: "15", month: "3", year: "2015", driverLicence: randomdriverLicence, driverLicenceVersion: "121" });
  await userDetails.verifyAgeLimitAlert();
  await signup.verifySignupPage();
  await signup.fillPassword({ password: "Nectar1234###" });
  await addressDetails.verifyAddressDetailsPage();
  await addressDetails.fillAddressDetails({ address: "8 Alpha Avenue, Coastlands, Whakatane 3120", residentialStatus: "Own", currentAddressDuration: "2 years +", relationshipStatus: "Single", noOfDependents: "0", permanentCitizenOfNZ: "Yes" });
  await employmentStatus.verifyEmploymentStatusPage();
  await employmentStatus.fillEmploymentDetails({ employmentStatus: "Full-time", employmentType: "Office employment", currentJobDuration: "2 years +", howDidYouHearAboutUs: "Facebook" });
  await declinePage.verifyDeclinePage();
});
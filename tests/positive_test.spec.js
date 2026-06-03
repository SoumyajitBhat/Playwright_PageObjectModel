import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { GetStartedPage } from "../pages/GetStarted.js";
import { UserDetailsPage } from "../pages/UserDetailsPage.js";

test("Successful login validation", async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);
  const getStarted = new GetStartedPage(page);
  const userDetails = new UserDetailsPage(page);

  await login.navigate();
  await login.login("6Q83gs@&r");
  await home.clickCheckYourRateCTA();
  await getStarted.verifyGetStartedPage();
  // await getStarted.setLoanAmount(20000);

  const randomEmail = `testemail${Math.floor(10000 + Math.random() * 90000)}@yopmail.com`;
  const phoneNumber = `02${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;

  await getStarted.fillGetStartedForm({ amount: "$10,000", loanPurpose: "Home improvement", email: randomEmail, phone: phoneNumber, });

  const randomdriverLicence = `AB${Math.floor(100000 + Math.random() * 900000)}`;

  await userDetails.verifyUserDetaildsPage();
  await userDetails.fillUserDetails({ firstName: "CkTester", middleName: "One", lastName: "MaskedLabel", gender: "Male", day: "15", month: "3", year: "1989", driverLicence: randomdriverLicence, driverLicenceVersion: "121" });
});
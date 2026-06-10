import { test } from "@playwright/test";
import { LoginPage } from "../pages/Salesforce/LoginPage";
import { generate } from "otplib";
import { HomePage } from "../pages/Salesforce/HomePage";
import { ServiceConfigPage } from "../pages/LoanServiceing/ServiceConfigPage";
import { ApexJobPage } from "../pages/LoanServiceing/ApexJobPage";

test("Date movement validation", async ({ page }) => {
  const login = new LoginPage(page);
  const homePage = new HomePage(page);
  const serviceConfigPage = new ServiceConfigPage(page);
  let sodEodPage = undefined;
  const apexJobPage = new ApexJobPage(page);

  await login.navigate();
  await login.login("soumyajit.bhattacharjee@cloudkaptan.com", "Somu@1814029");
  await login.verifyOTPPage();

  const otp = await generate({secret: "RWLRCBMINBI6WB3YBVKL6EK2XSUTRO2M"});
  await login.enterOTPandVerify(String(otp));
  await homePage.verifyHomePage();
  await homePage.clickServicingConfig();
  await serviceConfigPage.verifyServiceConfigPage();
  sodEodPage = await serviceConfigPage.clickSODEODProcess();
  await sodEodPage.verifySodEodPage();
  await sodEodPage.moveSystemDateToFuture(1);
  await page.bringToFront();
  await apexJobPage.navigate();
  await apexJobPage.verifyApexJobPage();
  await apexJobPage.visibilityOfLocClosureDynamicJob();
});

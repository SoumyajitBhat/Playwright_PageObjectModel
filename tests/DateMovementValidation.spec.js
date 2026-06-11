import { test } from "@playwright/test";
import { LoginPage } from "../pages/salesforce/LoginPage";
import { generate } from "otplib";
import { HomePage } from "../pages/salesforce/HomePage";
import { ServiceConfigPage } from "../pages/loanservicing/ServiceConfigPage";
import { ApexJobPage } from "../pages/loanservicing/ApexJobPage";
import { CLContractPage } from "../pages/loanservicing/CLContractPage";

test("Date movement validation", async ({ page }) => {
  const login = new LoginPage(page);
  const homePage = new HomePage(page);
  const serviceConfigPage = new ServiceConfigPage(page);
  let sodEodPage = undefined;
  const apexJobPage = new ApexJobPage(page);
  const clContractPage = new CLContractPage(page);
  let transactionSummaryPage = undefined;
//login
  await login.navigate();
  await login.login("soumyajit.bhattacharjee@cloudkaptan.com", "Somu@1814029");
  await login.verifyOTPPage();

  const otp = await generate({secret: "RWLRCBMINBI6WB3YBVKL6EK2XSUTRO2M"});

  await login.enterOTPandVerify(String(otp));
  //opening CL contract before date movement
  await homePage.verifyHomePage();
  await homePage.clickCLContracts();
  await clContractPage.verifyCLContractPage();
  await clContractPage.clickCLContract("LAI-00029379");
  await clContractPage.verifyCLContractDetails();
  //validate next due date
  await clContractPage.verifyNextDueDate('31/01/2026');
  //validate loan status
  await clContractPage.verifyCLContractStatus('Active - Good Standing');
  //validate disbursal status
  await clContractPage.verifyCLContractDisbursalStatus('Fully Disbursed');
  //validate periodic fee setup
  await clContractPage.clickPeriodicFeeSetup();
  await clContractPage.verifyValueByRowAndColumnofFeeTable('Administration Fee','Active','Checked');
  //validate automated payment setup is active
  await clContractPage.clickAutomatedPaymentSetups();
  await clContractPage.verifyAutomatedPaymentSetupColumnValue('Active','Checked');
  //validate transactions
  await clContractPage.clickTransactionsTab();
  //validate loan disbursal transaction is cleared
  await clContractPage.clickFundingTab();
  await clContractPage.verifyLoanDisbursalTransactionColumnValue('Cleared','Checked');
  //validate charges
  await clContractPage.clickChargesTab();
  await clContractPage.verifyValueByRowAndColumnofChargesTable('Administration Fee','Paid','Checked');
  //validate bills due date and payment date
  await clContractPage.clickBillsTab();
  await clContractPage.verifyBillsTableTopRowColumnValue('Due Date','24/01/2026');
  await clContractPage.verifyBillsTableTopRowColumnValue('Payment Date','24/01/2026');
  //date movement process started
  await homePage.clickServicingConfig();
  await serviceConfigPage.verifyServiceConfigPage();
  sodEodPage = await serviceConfigPage.clickSODEODProcess();
  await sodEodPage.verifySodEodPage();
  await sodEodPage.moveSystemDateToFuture(1);
  await page.bringToFront();
  //visited apex jobs page to verify date movement completion
  await apexJobPage.navigate();
  await apexJobPage.verifyApexJobPage();
  await apexJobPage.visibilityOfLocClosureDynamicJob();
  //Validate cl contract post date movement
  await homePage.clickCLContracts();
  await clContractPage.verifyCLContractPage();
  await clContractPage.clickCLContract("LAI-00029379");
  await clContractPage.verifyCLContractDetails();
  await clContractPage.clickTransactionsTab();
  //check bill generated, due date, payment date
  await clContractPage.clickBillsTab();
  await clContractPage.verifyBillsTableTopRowColumnValue('Due Date','24/01/2026');
  await clContractPage.verifyBillsTableTopRowColumnValue('Payment Date','24/01/2026');
  //check payment generated, transaction date
  await clContractPage.clickPaymentTab();
  await clContractPage.verifyLoanPaymentTransactionColumnValue('24/01/2026','Cleared','Checked');

  //validate loan payment transac summary from Q2 and ck custom
  await clContractPage.clickAccountStatement();
  await clContractPage.clickTransactionSummary();
  await clContractPage.verifyTransactionSummaryPage();
  await clContractPage.verifyTransactionSummaryBottomRowColumnValue('Transaction Date', '24/01/2026');
  await clContractPage.clickCloseTransactionSummary();
  transactionSummaryPage = await clContractPage.clickTxnSummaryButton();
  await transactionSummaryPage.verifyTransactionSummaryPage();

});

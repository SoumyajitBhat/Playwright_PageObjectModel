import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { GetStartedPage } from '../pages/GetStarted.js';

test('Successful login validation', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const getStarted = new GetStartedPage(page);

    await login.navigate();
    await login.login('6Q83gs@&r');
    await home.clickCheckYourRateCTA();
    await getStarted.fillGetStartedForm();
});
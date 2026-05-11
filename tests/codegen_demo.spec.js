import { test, expect } from "@playwright/test";

test("demo test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  //await page.pause();
  await page.locator('[data-test="username"]').click();
  await expect(page.locator('[data-test="username"]')).toHaveAttribute(
    "data-test",
    /.*erna/,
  );
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

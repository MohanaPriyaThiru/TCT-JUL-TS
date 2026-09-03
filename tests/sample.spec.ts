import { test } from "@playwright/test";
// Fixture --inbuild--->Browser,Browsercontext,page, request
// Custom fixture-
test("Facebook", async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto("https://www.facebook.com/");
  await page.getByLabel("Log in", { exact: true }).click();
  await page.waitForTimeout(3000);
});

test("Instagram", async ({ page }) => {
  await page.goto("https://www.instagram.com/");
  await page.waitForTimeout(3000);
});

test.fixme("testautomation page", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // type - CSS selectors, in-built locators, XPath(Absolute,relative,XPath Axes)
  // CSS - tagName#value - ID
  // tagName1.value - class
  //tag[attribute=value]
  await page.locator("[placeholder='Enter Phone']").fill("9876543210");
  await page.locator(".form-check-input[value='male']").check();
  await page.waitForTimeout(3000);
});

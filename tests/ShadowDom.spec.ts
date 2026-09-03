// ShadowDOM-->part of the DOm Hidden 
// ShadowRoot(open)---> inbuild locators and css selctors , cant use Xpath
// ShadowRoot(closed)--->  cant use inbuild locators,css selctors and Xpath, will ask the developer to open the root in testing environment
import { test, expect } from "@playwright/test";

test("Shadow Dom Handling", async ({ page }) => {
  await page.goto("https://selectorshub.com/xpath-practice-page/");
  //   await page.locator("#kils").fill("priya");
  await page.getByPlaceholder("enter name", { exact: true }).fill("priya");
  await page.locator('[id="pwd"]').fill("152455663");
  await page.waitForTimeout(3000);
});

import { test, expect } from "@playwright/test";

test("facebook", async ({ page }) => {
  await page.goto("https://www.facebook.com/reg/?entry_point=login&next=");
  await page.getByLabel("First name").fill("Priya");
  await page.getByLabel("Surname", { exact: true }).fill("Thiru");
  await page.pause();
  await page.getByLabel("Select day").click();
  await page.getByRole("option", { name: "15" }).click();
  await page.getByLabel("Select month").click();
  await page.getByRole("option", { name: "March" }).click();
  await page.getByLabel("Select year").click();
  await page.getByRole("option", { name: "2017" }).click();
  // await page.waitForSelector("//span[text()='Select your gender']");
  await page.waitForSelector("#_R_mad6p4jikacppb6amH2_");
  await page.locator("#_R_mad6p4jikacppb6amH2_").click();
  await page.getByRole("option", { name: "Female" }).click();
  await page.getByLabel("Mobile number or email address").fill("9600105020");
  await page.locator('[type="password"]').fill("Trends@1256");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForTimeout(5000);
});

import { test, expect } from "@playwright/test";

test("Rediff mail regis", async ({ page }) => {
  await page.goto("https://mail.rediff.com/cgi-bin/login.cgi");
  await page.getByRole("link", { name: "Get a new Rediffmail ID" }).click();
  await page.getByPlaceholder("Enter Rediffmail ID").fill("mohanapriya");
  await page.locator(".btn_checkavail").click();
  await page.waitForTimeout(3000);
  await page.locator("#radio_login").nth(1).check();

  await page.locator(".countryCodeText").click();
  await page
    .locator("#country_id ul li")
    .filter({ hasText: "American Samoa (+1684)" })

    .click();
});


import { test, expect } from "@playwright/test";

test("Alerts", async ({ page }) => {
  // Alerts-Browser Native and Modal Alerts

  await page.goto("https://letcode.in/alert");
  page.on("dialog", async (a) => {
    console.log(a.message());

    if (a.type() == "alert") {
      await a.accept("priya");
    } else if (a.type() == "prompt") {
      console.log(a.message());
      await a.accept("priya");
      await expect(page.locator("#myName")).toHaveText(/priya/);
    } else {
      console.log(a.message());

      await a.dismiss();
    }
  }); //listerner

  //await page.getByRole("button", { name: "Prompt Alert" }).click(); //event should happen
  // await page.getByRole("button", { name: "Confirm Alert" }).click(); //event should happen
  await page.getByRole("button", { name: "Modern Alert" }).click(); //event should happen
  await page.waitForTimeout(1000);
  await page.waitForTimeout(2000);
  await page.getByLabel("close", { exact: true }).click();
});

test("codegen @sanity ", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await expect(page.getByText("For Selenium, Cypress &")).toBeVisible();
  await page.getByRole("link", { name: "Data Entry Form" }).click();
  await page.getByRole("textbox", { name: "Enter Name" }).click();
  await page.getByRole("textbox", { name: "Enter Name" }).fill("priya");
  await page.getByRole("textbox", { name: "Enter EMail" }).click();
  await page.getByRole("textbox", { name: "Enter EMail" }).fill("priya@gamail");
  await page.getByRole("textbox", { name: "Enter Phone" }).click();
  await page.getByRole("textbox", { name: "Enter Phone" }).fill("4561237890");
  await expect(page.locator("#post-body-1307673142697428135")).toContainText(
    "Name:",
  );
  await expect(page.getByRole("textbox", { name: "Enter Name" })).toHaveValue(
    "priya",
  );
  await page.getByRole("textbox", { name: "Enter EMail" }).click();
  await expect(page.locator("h3")).toMatchAriaSnapshot(
    `- heading "Data Entry Form" [level=3]`,
  );
});

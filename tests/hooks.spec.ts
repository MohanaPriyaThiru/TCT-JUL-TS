import { test, expect } from "@playwright/test";

test.describe("grouping login testcases", () => {
  test.beforeAll(async () => {
    console.log("Before All - Runs once before all test");
  });
  test.afterAll(async () => {
    console.log("After all -runs once after all the test");
  });
  test.beforeEach(async () => {
    console.log("Before Each -runs before each test");
  });
  test.afterEach(async () => {
    console.log("After Each -runs after each test");
  });

  test("valid login", async ({ page }) => {
    await page.goto("https://testing.qaautomationlabs.com/file-download.php");
    await page.waitForTimeout(3000);
    console.log("vaid Login");
  });
  test("Inavalid login", async ({ page }) => {
    await page.goto("https://testing.qaautomationlabs.com/file-download.php");
    await page.waitForTimeout(3000);
    console.log("Invaid Login");
  });
});

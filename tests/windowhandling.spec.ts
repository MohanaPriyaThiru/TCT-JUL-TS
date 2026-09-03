import {
  test,
  expect,
  chromium,
  Browser,
  Page,
  BrowserContext,
} from "@playwright/test";

test("Handling tabs", async () => {
  const browser: Browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const mainPage: Page = await context.newPage();
  await mainPage.goto("https://testautomationpractice.blogspot.com/");
  const mainPageTitle = await mainPage.title();
  await expect(mainPage).toHaveTitle(mainPageTitle);
  //   Promise.all()
  const [newPage]: [Page, void] = await Promise.all([
    context.waitForEvent("page"),
    mainPage.getByRole("button", { name: "New Tab" }).click(),
  ]); //page-->popup;context--->page
  const newPageTitle = await newPage.title();
  console.log(newPageTitle);
  expect(newPageTitle).toBe("SDET-QA Blog");
  await newPage.locator('[name="q"]').fill("playwright");
  await newPage.waitForTimeout(2000);
  await mainPage.bringToFront();
  await mainPage.getByRole("checkbox", { name: "Tuesday" }).check();
  await mainPage.waitForTimeout(2000);
});

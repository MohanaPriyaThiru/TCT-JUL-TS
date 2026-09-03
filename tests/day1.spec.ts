import { test, expect } from "@playwright/test";
test("Name of the testcase", async ({ context }) => {
  //   const browser = await chromium.launch();
  // const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.facebook.com/");
  await page.locator('[name="email"]').fill("priya@gmail");
});

test("Xpath Practice", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  await expect(page).toHaveTitle("Automation Testing Practice");
  await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
  //   xpath using text with normalize-space
  const autoElement = page.locator(
    "//h1[normalize-space(text())='Automation Testing Practice']",
  );
  const eleVis = await autoElement.isVisible();
  console.log(eleVis);
  await expect(autoElement).toBeVisible();

  //   Basic Xpath
  const userNamefield = page.locator("//input[@id='name']");
  console.log(await userNamefield.isEnabled());
  console.log(await userNamefield.isEditable());
  console.log(await userNamefield.isHidden());
  console.log(await userNamefield.isDisabled());

  await expect.soft(userNamefield).toBeVisible();
  await expect(userNamefield).toBeAttached();
  await expect(userNamefield).toBeEnabled();
  await expect(userNamefield).toBeEditable();
  await userNamefield.fill("Priya");
  await expect(userNamefield).toHaveValue("Priya");

  await page.waitForTimeout(3000);
  //   console.log(await autoElement.isEditable());
  await page.locator("#male").check();
  await expect(page.locator("#male")).toBeChecked();
  await page.locator("#monday").check();
  await page.locator("#monday").uncheck();
});

test.only("SelectorsHub ", async ({ page }) => {
  await page.goto("https://selectorshub.com/xpath-practice-page/");
  await page
    .locator('//input[contains(@id,"shub")]')
    .fill("Priya", { force: true });
  await page.waitForTimeout(3000);
});

// instagram
// user and pass --login enable
// dis
// await loginbutton.isDisabled()--->false
//  await expect(loginbutton).toBeEnabled();
// diff btw css and xpath
// css-- single direction -->downward, fast ,  cannot match using  text
// xapth -- both direction --> upward and downward, slow, can use or match  visible text  using text()

// UserFacing locator or inbuild locators or semantic locators
// getByRole()
// getBylabel()
// getByPlaceholder()
// getByTitle()
// getByText()
// getByAltText()
// getByTestId()
test("Playwright inbuild locators", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  // getByPlaceholder()--> fill the placeholder's attribute value
  await page.getByPlaceholder("Enter Name").fill("Priya");
  await page.getByPlaceholder("Enter EMail").fill("priya@gmail.com");
  await page.waitForTimeout(3000);
  // getByTitle()--->fill the title attribute's value
});

test("Playwright userfacing  locators", async ({ page }) => {
  await page.goto(
    "https://testautomationpractice.blogspot.com/p/playwrightpractice.html",
  );
  /*  await expect(page).toHaveTitle(
    "Automation Testing Practice: PlaywrightPractice",
  );
  await expect(page).not.toHaveTitle("Automation Testing ");
  // getByTitle()--->fill the title attribute's value
  const text = await page.getByTitle("Home page link").innerText(); //will exculde hidden text, slow
  expect(text).toContain("Home");
  await page.getByTitle("HyperText Markup Language").dblclick();
  await page.waitForTimeout(3000);
  // getBYAltText()
  const logo = await page.getByAltText("logo image").isVisible();
  expect(logo).toBeTruthy();
  expect(logo).not.toBeFalsy(); */
  // getByText() --> visible text
  const t = await page.getByText("Another paragraph with ").innerText();
  console.log(t);
  const inner = await page
    .getByText("Locate elements by their text content.")
    .textContent(); //will include hidden text, fast
  console.log(inner);
  await page.getByText("Submit Form").click();
  // getByLabel

  // <label for ='1234'> string  <label/>
  // <input  id= '1234567'>
  await page.getByLabel("Email Address:").fill("email@gmail.com");

  //  <label>
  // <input>
  // "visible text"
  // <label/>

  await page.getByLabel(/Password:/).fill("#$12335545)(");

  // <label id = '11234'> string </label>
  // <input aria-labelledby='11234'
  await page.getByLabel("Your Age:").fill("25");

  // <input aria- label="string">
  // await page.getByLabel('string')

  // getByRole()
});

test("getByRole practice", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");
  // await page.getByRole("textbox", { name: "Username:" }).fill("playwright");
  await page.getByRole("button", { name: "START" }).click();
  // await page.waitForTimeout(3000);
  // await page.getByRole("menuitem").getByRole("link", { name: "Home" }).click();
  await page.waitForTimeout(3000);

  await page.getByRole("radio", { name: "Male", exact: true }).check();
  await page.waitForTimeout(3000);
  await page.getByRole("heading", {
    name: "Automation Testing Practice",
    level: 3,
  });

  // getByTestId()--- data-testid="value"
  // await page.getByTestId("value1");
  // data-qa="value0"
  // data-pw="value1"
});

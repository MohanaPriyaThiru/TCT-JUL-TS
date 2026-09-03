import { test, expect } from "@playwright/test";

test("dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.reload();
  //   dropdown
  // 2types -- native dd /select tag dd- select ---selectOptions()
  // dynamic dd/auto suggess--ul, ol, div

  // select
  // 3 types
  // value , label,index
  //single select dropdown
  await page
    .getByRole("combobox", { name: "Country:" })
    .scrollIntoViewIfNeeded();
  //   select By Value
  await page
    .getByRole("combobox", { name: "Country:" })
    .selectOption({ value: "germany" });
  await page.waitForTimeout(2000);

  //   select By label
  await page
    .getByRole("combobox", { name: "Country:" })
    .selectOption({ label: "Japan" });
  await page.waitForTimeout(2000);

  //   select By index
  await page
    .getByRole("combobox", { name: "Country:" })
    .selectOption({ index: 1 });
  await page.waitForTimeout(2000);

  const noOfOption = await page
    .getByRole("listbox", { name: "Sorted List:" })
    .getByRole("option")
    .count();

  const optionNames = await page
    .getByRole("listbox", { name: "Sorted List:" })
    .getByRole("option")
    .allTextContents();
  console.log(optionNames);
  console.log(noOfOption);
  await expect(noOfOption).toBe(10);
  await page
    .getByRole("listbox", { name: "Sorted List:" })
    .scrollIntoViewIfNeeded();
  //   select By Value
  await page
    .getByRole("listbox", { name: "Sorted List:" })
    .selectOption([{ value: "cheetah" }, { label: "Dog" }, { index: 4 }]);
  await page.waitForTimeout(2000);

  //   select By label
  await page
    .getByRole("listbox", { name: "Sorted List:" })
    .selectOption([{ label: "Cat" }, { label: "Fox" }]);
  await page.waitForTimeout(2000);
});

test("get Checked option", async ({ page }) => {
  // await page.setViewportSize({ height: 1080, width: 1920 });
  await page.goto("https://letcode.in/dropdowns");
  const dd = page.locator("#fruits");
  await dd.selectOption({ label: "Orange" });
  const selectedOption = await dd.locator("option:checked").innerText();
  console.log(selectedOption);
  const optionNotSelected = await dd
    .locator("option:not(:checked)")
    .allInnerTexts();
  console.log(optionNotSelected);
});

test("RS Aca", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page
    .getByPlaceholder("Type to Select Countries")
    .pressSequentially("Ind", { delay: 200 });
  await page.waitForTimeout(2000);

  await page.getByPlaceholder("Type to Select Countries").press("ArrowDown");
  await page.waitForTimeout(2000);
  await page.getByPlaceholder("Type to Select Countries").press("ArrowDown");
  await page.getByPlaceholder("Type to Select Countries").press("Enter");
  await page.waitForTimeout(2000);
});

test("Auto suggess", async ({ page }) => {
  await page.goto("https://www.amazon.in/");
  await page.getByRole("searchbox").pressSequentially("iphone");
  // await page.waitForSelector('[role="grid"] [role="row"]');
  await page.locator('[role="grid"] [role="row"]').first().waitFor();
  const autoValues = await page
    .locator('[role="grid"] [role="row"]')
    .allTextContents();
  console.log(autoValues);
  for (let dd of autoValues) {
    if (dd == "iphone 16 pro 256gb") {
      await page.getByLabel("iphone 16 pro 256gb").click();
      await page.waitForTimeout(2000);
      break;
    }
  }
  await page
    .getByRole("listbox")
    .getByRole("presentation")
    .filter({ has: page.locator("li") });
});

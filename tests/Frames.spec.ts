import { test, expect } from "@playwright/test";

test("frames handling", async ({ page }) => {
  await page.goto("https://letcode.in/frame");
  await page
    .frameLocator("#firstFr")
    .getByPlaceholder("Enter name")
    .fill("priya");
  await page
    .frameLocator("#firstFr")
    .locator('[name="lname"]')
    .fill("hhjhbjhbjhb");
  await page.waitForTimeout(3000);
  await page
    .frameLocator("#firstFr")
    .frameLocator('[title="Inner Frame"]')
    .locator('[name="email"]')
    .fill("hjjhhvjhv5564");
});

test("iframes using framesmethod", async ({ page }) => {
  await page.goto("https://letcode.in/frame");
  console.log(await page.url())

  const allFramesInPage = await page.frames();
  // console.log(allFramesInPage);
  allFramesInPage.forEach((frames, index) => {
    console.log(`${index} : ${frames.url()}`);
  });

  await allFramesInPage[1].locator('[name="fname"]').fill("priya");
  await allFramesInPage[1].locator('[name="lname"]').fill("thiru");
  await allFramesInPage[2].locator('[name="email"]').fill("hjjhhvjhv5564");
});

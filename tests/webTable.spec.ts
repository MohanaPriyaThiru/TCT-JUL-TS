import { test, expect } from "@playwright/test";

test("webTable handling", async ({ page }) => {
  await page.goto("https://practicetestautomation.com/practice-test-table/");
  // To count the Columns
  const col = page.locator("table#courses_table thead tr th");
  const colCount = await col.count();
  console.log(colCount);
  await col.nth(3).screenshot({ path: "screenshot/4thColumn.jpeg" });
  expect(colCount).toBeGreaterThan(1);
  expect(colCount).toBe(6);
  expect(colCount).not.toBeLessThan(0);
  await page.screenshot({ path: "screenshot/table.png" });
  await page.screenshot({ path: "table.png", fullPage: true });
  //   column Name validation
  await expect(col).toHaveText([
    "ID",
    "Course Name",
    "Language",
    "Level",
    "Enrollments",
    "Link",
  ]);

  const row = page.locator("table#courses_table tbody tr");
  const rowCount = await row.count();
  console.log(rowCount);
  expect(rowCount).toBe(9);

  //   To retrive particular cell value
  const data = await page
    .locator("table tbody tr:nth-child(3) td:nth-child(2)")
    .innerText();
  console.log(data);

  //   To retrive particular row data
  const rowdata = await page
    .locator("table tbody tr:nth-child(5) td")
    .allInnerTexts();
  console.log(rowdata);

  console.log(
    await page
      .getByRole("row")
      .filter({ hasText: "Advanced Selenium" })
      .allInnerTexts(),
  );

    const targetRow = page
      .getByRole("row")
      .filter({ hasText: "Selenium Framework" });
  console.log(await targetRow.getByRole("cell", { name: "Java" }).innerText());
});

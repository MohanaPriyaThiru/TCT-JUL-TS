import { test } from "@playwright/test";
import { LoginPage } from "../pageObjectModel/loginPage";
import data from "../testdata/data.json";
import dd from "../testdata/dd.json";
import { excelReader, Reader } from "../utility/excelReader";
const exceldata: Reader[] = excelReader();

for (let d of exceldata) {
  test(`data driven  ${d.UserName} and ${d.Password}`, async ({ page }) => {
    const obj = new LoginPage(page);
    await obj.navigate(data.url, data.assertTitle);
    await obj.loginMethod(d.UserName, d.Password);
    await obj.AssertHomePage(data.assertHome);
  });
}

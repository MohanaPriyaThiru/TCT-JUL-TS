import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjectModel/loginPage";
import data from "../testdata/data.json";
import { ProductSearch } from "../pageObjectModel/productSearchPage";
import { testFixture } from "../fixture/loginfixture";
let logObj;
testFixture("Login Page test Case", async ({ loginFixture }) => {
  //   await page.pause();
  // logObj = new LoginPage(page);

  // await logObj.navigate(data.url, data.assertTitle);
  // await logObj.loginMethod(data.userName, data.password);
  await expect(loginFixture).toHaveTitle(data.assertHome);
});

testFixture("Product search and addt to cart", async ({ loginFixture }) => {
  // logObj = new LoginPage(page);
  // await logObj.navigate(data.url, data.assertTitle);
  // await logObj.loginMethod(data.userName, data.password);
  const prodObj = new ProductSearch(loginFixture);
  await prodObj.isHeadingVisible();
  await prodObj.addProductToCart();
});

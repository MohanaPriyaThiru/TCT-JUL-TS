import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pageObjectModel/loginPage";
import data from "../testdata/data.json";

type myFixture = {
  loginFixture: Page;
  page: Page;
};

// base.extend({fixtureName:async ({page},use)=>{ }})

export const testFixture = base.extend<myFixture>({
  loginFixture: async ({ page }, use) => {
    const obj = new LoginPage(page);
    await obj.navigate(data.url, data.assertTitle);
    await obj.loginMethod(data.userName, data.password);
    use(page);
  },
});

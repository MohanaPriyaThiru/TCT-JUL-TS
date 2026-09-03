import { Page, Locator, expect } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  password: Locator;
  checkboxTerms: Locator;
  signInbtn: Locator;
  constructor(page: Page) {
    //Page and  locators
    this.page = page;
    this.username = page.getByLabel("Username:");
    this.password = page.locator("#password");
    this.checkboxTerms = page.locator('[name="terms"]');
    this.signInbtn = page.getByRole("button", { name: "Sign In" });
  }

  // reusable methods
  async navigate(url: string, title: string) {
    await this.page.goto(url);

    await expect(this.page).toHaveTitle(title);
  }
  async loginMethod(UN: string, Pwd: string) {
    await this.username.fill(UN);
    await this.password.fill(Pwd);
    await this.checkboxTerms.check();
    await this.signInbtn.click();
  }
  async AssertHomePage(assertTitle: string) {
    await expect(this.page).toHaveTitle(assertTitle);
  }
}

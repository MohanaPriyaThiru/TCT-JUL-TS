import { Page, Locator, expect } from "@playwright/test";

export class ProductSearch {
  readonly page: Page;
  readonly Proto: Locator;
  readonly addtoCartbutton: Locator;
  readonly checkoutButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.Proto = page.getByRole("link", { name: "ProtoCommerce Home" });
    this.addtoCartbutton = page.locator(
      '//a[text()="Samsung Note 8"]//ancestor::div[@class="card h-100"]//descendant::div[@class="card-footer"]//child::button',
    );
    this.checkoutButton = page.locator("//a[contains(text(),'Checkout')] ");
  }

  async isHeadingVisible(): Promise<void> {
    await expect(this.Proto).toBeVisible();
  }

  async addProductToCart(): Promise<void> {
    await this.addtoCartbutton.click();
    await this.checkoutButton.click();
    const value = await this.page
      .getByRole("columnheader", { name: "Product" })
      .isVisible();
    expect(value).toBeTruthy();
  }
}

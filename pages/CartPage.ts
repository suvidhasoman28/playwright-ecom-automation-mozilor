import { Page, expect } from "@playwright/test";

/**
 * Page Object Model class representing the Cart Page.
 * Provides methods to verify product details and perform actions like
 *  product checkout.
 */
export class CartPage {

  readonly page: Page;
  readonly productNameInCart: string;
  readonly productPriceInCart: string;
  readonly totalAmount: string;
  readonly checkOutOption: string;
  readonly productCount: string;

  constructor(page: Page) {
    this.page = page;
    this.productNameInCart = "//tr[@class='ng-scope']//label[@class='roboto-regular productName ng-binding']";
    this.productPriceInCart = "td[class='smollCell'] p[class='price roboto-regular ng-binding']";
    this.totalAmount = "//span[@class='roboto-light ng-binding']/following-sibling::span";
    this.checkOutOption = "#checkOutButton";
    this.productCount = "label.roboto-regular.productName.ng-binding";

  }

  //Verify the product name from cart
  async verifyProductNameFrmCart(productName: string) {
    const product = await this.page.locator(this.productNameInCart).textContent();
    await expect.soft(product?.trim().toLowerCase()).toBe(productName.toLowerCase());
  }

  //Verify the product price from cart
  async verifyProductPriceFrmCart(productPrice: string) {
    const price = await this.page.locator(this.productPriceInCart).textContent();
    await expect.soft(price?.trim()).toBe(productPrice?.trim());
  }

  //Verify total amount from cart
  async verifyTotalAmount(amount: string, quantity: string) {
    const totalAmount = await this.page.locator(this.totalAmount).textContent();

    // Remove currency symbols and commas, convert to number
    const total = Number(totalAmount?.replace(/[^0-9.]/g, ''));
    const price = Number(amount.replace(/[^0-9.]/g, ''));
    const qty = Number(quantity);

    // Calculate expected total
    const expectedTotal = price * qty;
    await expect.soft(total).toBe(expectedTotal);

    return totalAmount;
  }

  //Take the quantity displayed for product in cart
  async productQuantity() {
    const quantity = await this.page.locator("td[class='smollCell quantityMobile'] label[class='ng-binding']").textContent();
    return quantity;
  }

  //Click check out
  async checkOut() {
    await this.page.locator(this.checkOutOption).click();
  }

  //Take total number of product in cart
  async takeProductCount() {
    const products = this.page.locator(this.productCount);
    const count = await products.count();
    console.log(`Total products in cart: ${count}`);
    return count;
  }

  //Remove items from cart
  async clearCart() {
    const removeButtons = this.page.locator("(//a[@class='remove red ng-scope'][normalize-space()='REMOVE'])");
    const count = await removeButtons.count();

    for (let i = 0; i < count; i++) {
      await removeButtons.nth(0).click(); // always click first since list updates dynamically
      await this.page.waitForTimeout(1000);
    }

    console.log(`Cleared ${count} items from cart`);
  }

  //Click continue shopping if no product is in cart
  async clickContinueShopping() {
    await this.page.getByRole('link', { name: 'CONTINUE SHOPPING' }).click();
  }

}
import { Page, expect } from "@playwright/test";

/**
 * Page Object Model class representing the Product Listing Page.
 * Provides methods to interact with products displayed in the product list,
 * such as selecting a product and retrieving its details.
 */
export class ProductListingPage {

    readonly page: Page;
    readonly firstProductName: string;
    readonly firstProductPrice: string;

    constructor(page: Page) {
        this.page = page;
        this.firstProductName = "//div[@class='cell categoryRight']//li[1]//a[@class='productName ng-binding']";
        this.firstProductPrice = "//div[@class='cell categoryRight']//li[1]//a[@class='productPrice ng-binding']";

    }

    //Select the first product from listing page
    async clickFirstproduct() {
        const product = await this.page.locator(this.firstProductName);
        await product.click();
    }

    //Get product name from listing page
    async getProductName() {
        const productName = await this.page.locator(this.firstProductName).textContent();
        return productName;

    }

    //Get product price from listing page
    async getProductPrice() {
        const productprice = await this.page.locator(this.firstProductPrice).textContent();
        return productprice;

    }


}
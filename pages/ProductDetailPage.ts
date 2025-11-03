import { Page, expect } from "@playwright/test";

/**
 * Page Object Model class representing the Product Detail Page.
 * Provides methods to verify product details and perform actions like
 * adding the product to the cart and navigating to the cart page.
 */
export class ProductDetailPage {

    readonly page: Page;
    readonly cartIcon: string;
    readonly productName:string;
    readonly productPrice:string;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = "#menuCart";
        this.productName = "//div[@id='Description']//h1";
        this.productPrice ="//div[@id='Description']/child::h2";
    }

    //Click Add to cart
    async addToCart() {
        await this.page.getByRole('button', { name: 'ADD TO CART' }).click();
    }

    //Go to cart page
    async goToCart() {
        await this.page.locator(this.cartIcon).click({timeout:3000});
    }

    //Verify product name from detail page
    async verifyProductName(product: string) {
        const productNameLocator = this.page.locator(this.productName);
        await expect.soft(productNameLocator).toHaveText(product, { ignoreCase: true });
    }

    //Verify product price from detail page
    async verifyProductPrice(price: string) {
        const productPriceLocator = this.page.locator(this.productPrice);
        await expect.soft(productPriceLocator).toContainText(price);
    }

}
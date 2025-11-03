import { expect, Page } from "@playwright/test";

/**
 * Page Object Model class representing the Home Page.
 * Provides reusable methods to verify user login, navigate product categories,
 * and perform logout actions.
 */
export class HomePage {
    readonly page: Page;
    readonly userIcon: string;
    readonly userNameDisplayed: string;
    readonly signOutOption: string;

    constructor(page: Page) {
        this.page = page;
        this.userIcon = "#menuUser";
        this.userNameDisplayed = "//span[@class='hi-user containMiniTitle ng-binding']";
        this.signOutOption = "//div[@id='loginMiniTitle']//label[normalize-space()='Sign out']";

    }

    //click user icon
    async clickUserIcon() {
        await this.page.locator(this.userIcon).click();
    }

    //Check the logged in username displayed in homepage
    async loggedInUserName(username: string) {
        const userNameLocator = await this.page.locator(this.userNameDisplayed);
        await userNameLocator.waitFor({state:'visible'});
        const getUserName = await userNameLocator.textContent();
        await expect.soft(getUserName).toBe(username);

    }

    //Select the product category from homepage
    async selectproductCategory(product:string) {       
        await this.page.getByLabel(`${product}`, { exact: true }).click();
    }

    //click signout
    async signOut() {
        await this.page.locator(this.userNameDisplayed).click();
        const signOutLocator = await this.page.locator(this.signOutOption);
        await signOutLocator.waitFor({ state: 'visible' });
        await signOutLocator.click();
    }

}
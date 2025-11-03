import { Page } from "@playwright/test";
/**
 * Page Object Model class representing the Base Page for navigating to application url
 */
export class BasePage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    //Go to application url
    async navigateTo(path: string) {
        await this.page.goto(path);
    }
}
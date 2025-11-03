import { expect, Page } from "@playwright/test";

/**
 * Page Object Model class representing the Sign In page.
 * Provides reusable methods to interact with and validate elements
 * on the login screen of the application.
 */
export class SignInPage {

    readonly page: Page;
    readonly signIn: string;
    readonly invalidLoginErrorMessage:string;

    constructor(page: Page) {
        this.page = page;
        this.signIn = "#sign_in_btn";
        this.invalidLoginErrorMessage = "//label[@class='or  center invalid']";

    }

    //Fill the username/password in sign in
    async enterSignInDetails(details: string, type: string) {
        await this.page.locator(`input[name="${type}"]`).fill(details);
    }

    //Click sign in button
    async clickSignIn() {
        await this.page.locator(this.signIn).click()
    }

    //Click create new account
    async clickCreateNewAccount() {
        await this.page.getByRole('link', { name: 'CREATE NEW ACCOUNT' }).click();

    }

    //Verify invalid login error message
    async invalidErrorMessage() {
        await this.page.locator(this.invalidLoginErrorMessage).waitFor({state:'visible'});
        await expect.soft(this.page.locator(this.invalidLoginErrorMessage))
            .toHaveText("Incorrect user name or password.");
    }



}
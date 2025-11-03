import { Page, expect } from "@playwright/test";

/**
 * Page Object Model class representing the Create Account (Registration) Page.
 * Provides methods to fill in registration details, handle validations,
 * and verify alerts during user account creation.
 */
export class CreateAccountPage {

    readonly page: Page;
    readonly userNameField: string;
    readonly emailField: string;
    readonly passwordField: string;
    readonly confirmPasswordField: string;
    readonly privacyCheckBox: string;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = "//input[@name='usernameRegisterPage']";
        this.emailField = "//input[@name='emailRegisterPage']";
        this.passwordField = "//input[@name='passwordRegisterPage']";
        this.confirmPasswordField = "//input[@name='confirm_passwordRegisterPage']";
        this.privacyCheckBox = "//input[@name='i_agree']";

    }

    //Enter username
    async enterUserName(userName: string) {
        await this.page.locator(this.userNameField).fill(userName);
    }

    //Enter email
    async enterEmail(email: string) {
        await this.page.locator(this.emailField).fill(email);
    }

    //Enter password
    async enterPassword(password: string) {
        await this.page.locator(this.passwordField).fill(password);
    }

    //Confirm password
    async enterConfirmPassword(password: string) {
        await this.page.locator(this.confirmPasswordField).fill(password);
    }

    //Check the priovcy check box
    async checkPrivacyNotice() {
        const checkBox = await this.page.locator(this.privacyCheckBox);
        if (!(await checkBox.isChecked())) {
            await checkBox.check();
        }
        await expect.soft(checkBox).toBeChecked();
    }

    //Click register button
    async clickRegister() {
        const register = await this.page.getByRole("button", { name: 'REGISTER' });
        await register.waitFor({ state: 'visible' });
        if (await register.isEnabled()) {
            await register.click();
        } else {
            console.log('Register button is disabled');
        }

    }

    //Verify user already exists alert
    async userAlreadyExistsAlert(){
       const alert = await this.page.locator("//label[@class='center block smollMargin invalid']");
       await alert.waitFor({state:'visible'});
       const message = await alert.textContent();
       await expect(message?.trim()).toContain("User name already exists")
       

    }

}
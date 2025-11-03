import { Page, expect } from "@playwright/test";

/**
 * Page Object Model class representing the Payment Page.
 * This class encapsulates user interactions and verifications for
 * the payment and order confirmation workflow.
 */
export class PaymentPage {

    readonly page: Page;
    readonly userNameField: string;
    readonly passwordField: string;
    readonly totalAmountDisplayed: string;
    readonly nextButton: string;
    readonly paymentUserName: string;
    readonly paymentPassword: string;
    readonly payNow: string;
    readonly orderConfirm: string;
    readonly shippingName: string;
    readonly orderConfirmTotalAmount:string;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = "[name='usernameInOrderPayment']";
        this.passwordField = "[name='passwordInOrderPayment']";
        this.totalAmountDisplayed = "//span[@class='roboto-medium totalValue ng-binding']";
        this.nextButton = "//div[@class='mobileBtnHandler']//button[@id='next_btn']";
        this.paymentUserName = "[name='safepay_username']";
        this.paymentPassword = "[name='safepay_password']";
        this.payNow = "#pay_now_btn_SAFEPAY";
        this.orderConfirm = "span.roboto-regular.ng-scope";
        this.shippingName = "//div[@class='innerSeccion'][div[@icon-user]]/label";
        this.orderConfirmTotalAmount ="//label[@class='total ng-binding']/a[@class='floater ng-binding']";

    }

    //Enter username to login in payment page
    async userNameInPayment(username: string) {
        const message = await this.page.getByText('Already have an account?');
        expect.soft(message).toBeVisible();
        await this.page.locator(this.userNameField).fill(username);
    }

    //Enter password to login in payment page
    async passwordInPayment(password: string) {
        const message = await this.page.getByText('Already have an account?');
        expect.soft(message).toBeVisible();
        await this.page.locator(this.passwordField).fill(password);

    }

    //Click login from payment page
    async clickLogin() {
        await this.page.getByRole('button', { name: 'LOGIN' }).click();
    }

    //Verify user details
    async verifyUserDetails(name: string) {
        const userName = await this.page.locator(`//div[@id='userDetails']//label[contains(normalize-space(),'${name}')]`).textContent();
        await expect.soft(userName?.trim()).toBe(name?.trim());
    }

    //Verify total amount in payment page
    async verifyTotalAmount(amount: string) {
        const amountLocator = await this.page.locator(this.totalAmountDisplayed).textContent();
        await expect.soft(amountLocator?.trim()).toBe(amount?.trim());
    }

    //Click next button to proceed to next page
    async clickNextButton() {
        await this.page.locator(this.nextButton).click();
    }

    //Enter payment method username
    async paymentMethodUserName(username: string) {
        await this.page.locator(this.paymentUserName).fill(username);
    }

    //Enter payment method password
    async paymentMethodpassword(password: string) {
        await this.page.locator(this.paymentPassword).fill(password);
    }

    //Click paynow option
    async clickPayNow() {
        await this.page.locator(this.payNow).click();
    }

    //verify order confirmation message 
    async orderConfirmMessage() {
        const message = await this.page.locator(this.orderConfirm).textContent();
        await expect.soft(message?.trim()).toContain("Thank you for buying");
    }

    //verify shipping to: name of the user
    async shippingToName(expectedName: string) {
        const userLabel = this.page.locator(this.shippingName);
        await expect.soft(userLabel).toHaveText(expectedName);
    }

    //Total amount displayed
    async totalAmount(amount: string) {
        await expect.soft(
            this.page.locator(this.orderConfirmTotalAmount)
        ).toHaveText(amount);

    }









}
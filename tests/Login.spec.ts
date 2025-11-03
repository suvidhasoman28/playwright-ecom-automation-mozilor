import { test, expect } from "@playwright/test";
import { BasePage } from '../pages/BasePage';
import { CreateAccountPage } from "../pages/CreateAccountPage";
import { SignInPage } from "../pages/SignInPage";
import { HomePage } from "../pages/HomePage";
import { Helper } from "../utils/Helper";
import testData from '../data/testData.json';

/**
 * @testSuite User Login Flow
 * This test suite validates the end-to-end user authentication journey.
 * It covers:
 *  - Account creation
 *  - Successful login with valid credentials
 *  - Logout functionality
 *  - Handling invalid login attempts
 */
test.describe('User Login Flow', () => {

    let base: BasePage;
    let homePage: HomePage;
    let signInPage: SignInPage;
    let createAccount: CreateAccountPage;
    let helper: Helper;
    let userName: string;
    let password: string;
    let email: string;

    test.beforeEach(async ({ page }) => {
        //Initialize all page objects
        base = new BasePage(page);
        homePage = new HomePage(page);
        signInPage = new SignInPage(page);
        createAccount = new CreateAccountPage(page);

        //Navigate to application Url
        await base.navigateTo(testData.baseUrl);
        await page.waitForLoadState();
    });


    test('Create New User Account', async ({ page }) => {

        // Create account step
        await test.step('Create account using valid credentials and verify username', async () => {
            await homePage.clickUserIcon();
            await signInPage.clickCreateNewAccount();
            helper = new Helper();
            userName = await helper.generateUserName();
            password = await helper.generatePassword();
            email = await helper.generateEmail();
            await createAccount.enterUserName(userName);
            await createAccount.enterEmail(email);
            await createAccount.enterPassword(password);
            await createAccount.enterConfirmPassword(password);
            await createAccount.checkPrivacyNotice();
            await createAccount.clickRegister();
            await page.waitForLoadState();
            await homePage.loggedInUserName(userName);
        });


    });

    test("Login with valid credentials", async ({ page }) => {

        // Login step
        await test.step('Login with valid credentials and verify username', async () => {
            await homePage.clickUserIcon();
            await signInPage.enterSignInDetails(testData.user2.username, "username");
            await signInPage.enterSignInDetails(testData.user2.password, "password");
            await signInPage.clickSignIn();
            await page.waitForLoadState();
            await homePage.loggedInUserName(testData.user2.username);
        });
    });

    test("Logout after login", async ({ page }) => {
        // Logout after login 
        await test.step('Login with valid credentials and and then logout', async () => {
        await homePage.clickUserIcon();
        await signInPage.enterSignInDetails(testData.user2.username, "username");
        await signInPage.enterSignInDetails(testData.user2.password, "password");
        await signInPage.clickSignIn();
        await page.waitForLoadState();
        await homePage.signOut();
        });
    });

    test("Invalid login", async ({ page }) => {
        // Invalid login
        await test.step('Login with invalid credentials and verify error message', async () => {
        await homePage.clickUserIcon();
        await signInPage.enterSignInDetails(testData.invalidUser.username, "username");
        await signInPage.enterSignInDetails(testData.invalidUser.password, "password");
        await signInPage.clickSignIn();
        await page.waitForLoadState();
        await signInPage.invalidErrorMessage();
        });
    });

    test('Create Account using already existing credentials', async ({ page }) => {

        // Create account step
        await test.step('Create account using valid credentials and verify username', async () => {
            await homePage.clickUserIcon();
            await signInPage.clickCreateNewAccount();
            await createAccount.enterUserName(testData.user2.username);
            await createAccount.enterEmail(testData.user2.email);
            await createAccount.enterPassword(testData.user2.password);
            await createAccount.enterConfirmPassword(testData.user2.password);
            await createAccount.checkPrivacyNotice();
            await createAccount.clickRegister();
            await page.waitForLoadState();
            await homePage.loggedInUserName(userName);
        });


    });

    

});
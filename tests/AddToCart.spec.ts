import { test, expect } from "@playwright/test";
import { BasePage } from '../pages/BasePage';
import { CreateAccountPage } from "../pages/CreateAccountPage";
import { SignInPage } from "../pages/SignInPage";
import { HomePage } from "../pages/HomePage";
import testData from '../data/testData.json';
import { ProductListingPage } from "../pages/ProductListingPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { CartPage } from "../pages/CartPage";
import { PaymentPage } from "../pages/PaymentPage";

/**
 * @testSuite Add to Cart Flow
 * This test suite validates the complete end-to-end shopping experience, including:
 *  - Logging into the application
 *  - Browsing product listings
 *  - Adding products to the cart
 *  - Verifying product details and prices
 *  - Completing checkout and payment
 */
test.describe('Add to Cart Flow', () => {

    let base: BasePage;
    let homePage: HomePage;
    let signInPage: SignInPage;
    let createAccount: CreateAccountPage;
    let productListingPage: ProductListingPage;
    let productDetailPage: ProductDetailPage;
    let cartPage: CartPage;
    let paymentPage: PaymentPage;

    test.beforeEach(async ({ page }) => {

        //Initialize all page objects
        base = new BasePage(page);
        homePage = new HomePage(page);
        signInPage = new SignInPage(page);
        createAccount = new CreateAccountPage(page);
        productListingPage = new ProductListingPage(page);
        productDetailPage = new ProductDetailPage(page);
        cartPage = new CartPage(page);
        paymentPage = new PaymentPage(page);

        //Navigate to application Url
        await base.navigateTo(testData.baseUrl);
        await page.waitForLoadState();
    });

    test('Logged in users: Add one product to cart and checkout', async ({ page }) => {

        //Declare required variables
        let productName, productPrice, quantity, totalAmount, productCount;

        // Login step
        await test.step('Login using valid credentials and verify username', async () => {
            await homePage.clickUserIcon();
            await signInPage.enterSignInDetails(testData.user2.username, "username");
            await signInPage.enterSignInDetails(testData.user2.password, "password");
            await signInPage.clickSignIn();
            await page.waitForLoadState();
            await homePage.loggedInUserName(testData.user2.username);
            await page.waitForLoadState();

        });

        // verify if there is any product in the cart and clear it before adding one
        await test.step('verify any product in the cart and clear it', async () => {
            await productDetailPage.goToCart();
            productCount = await cartPage.takeProductCount();
            if (productCount > 0) {
                await cartPage.clearCart();
                await page.waitForLoadState();
            }
            else {
                
                await cartPage.clickContinueShopping();
                await page.waitForLoadState();
            }

        });

        // Click product from listing page
        await test.step('Go to product listing page and click product', async () => {
            await homePage.selectproductCategory(testData.productCategory.name1);
            await page.waitForLoadState();
            await productListingPage.clickFirstproduct();
            productName = await productListingPage.getProductName();
            productPrice = await productListingPage.getProductPrice();
            await page.waitForLoadState();

        });

        // verify product from detail page and add to cart
        await test.step('Verify product and add to cart', async () => {
            await productDetailPage.verifyProductName(productName!);
            await productDetailPage.verifyProductPrice(productPrice!);
            await productDetailPage.addToCart();
            await page.waitForLoadState();
        });

        // Go to cart and verify the product and checkout
        await test.step('Go to cart,Verify the product and checkout', async () => {
            await productDetailPage.goToCart();
            await page.waitForLoadState();
            await cartPage.verifyProductNameFrmCart(productName!);
            await cartPage.verifyProductPriceFrmCart(productPrice!);
            quantity = await cartPage.productQuantity();
            totalAmount = await cartPage.verifyTotalAmount(productPrice!, quantity!);
            await cartPage.checkOut();
            await page.waitForLoadState();
        });

        // Verify Payment details and enter payment credentials
        await test.step('Verify Payment details and enter payment credentials and click pay now', async () => {
            await paymentPage.verifyUserDetails(testData.user2.username);
            await paymentPage.verifyTotalAmount(totalAmount!);
            await paymentPage.clickNextButton();
            await paymentPage.paymentMethodUserName(testData.user2.username);
            await paymentPage.paymentMethodpassword(testData.user2.password);
            await paymentPage.clickPayNow();
            await page.waitForLoadState();
        });

        //Order confirmation
        await test.step('Verify Order confirmation page details', async () => {
            await paymentPage.orderConfirmMessage();
            await paymentPage.shippingToName(testData.user2.username);
            await paymentPage.totalAmount(totalAmount!);
        });

    });

    test('Logged out users: Add one product to cart and checkout', async ({ page }) => {
        //Declare required variables
        let productName, productPrice, quantity, totalAmount, productCount;

        // verify if there is any product in the cart and clear it before adding one
        await test.step('verify any product in the cart and clear it', async () => {
            await productDetailPage.goToCart();
            productCount = await cartPage.takeProductCount();
            if (productCount > 0) {
                await cartPage.clearCart();
                await page.waitForLoadState();
            }
            else {
                
                await cartPage.clickContinueShopping();
                await page.waitForLoadState();
            }

        });

        // Click product from listing page
        await test.step('Go to product listing page and click product', async () => {
            await homePage.selectproductCategory(testData.productCategory.name2);
            await page.waitForLoadState();

            await productListingPage.clickFirstproduct();
            productName = await productListingPage.getProductName();
            productPrice = await productListingPage.getProductPrice();
            await page.waitForLoadState();

        });

        // verify product from detail page and add to cart
        await test.step('Verify product and add to cart', async () => {
            await productDetailPage.verifyProductName(productName!);
            await productDetailPage.verifyProductPrice(productPrice!);           
            await productDetailPage.addToCart();
            await page.waitForLoadState();
        });

        // Go to cart and verify the product and checkout
        await test.step('Go to cart,Verify the product and checkout', async () => {
            await productDetailPage.goToCart();
            await page.waitForLoadState();
            await cartPage.verifyProductNameFrmCart(productName!);
            await cartPage.verifyProductPriceFrmCart(productPrice!);
            quantity = await cartPage.productQuantity();
            totalAmount = await cartPage.verifyTotalAmount(productPrice!, quantity!);
            await cartPage.checkOut();
            await page.waitForLoadState();
        });

        // Enter the user login deatils from Payment page and log in
        await test.step('Enter the user login deatils from Payment page anf log in', async () => {
            await paymentPage.userNameInPayment(testData.user2.username);
            await paymentPage.passwordInPayment(testData.user2.password);
            await paymentPage.clickLogin();
            await page.waitForLoadState();
        });

        // Verify Payment details and enter payment credentials
        await test.step('Verify Payment details and enter payment credentials and click pay now', async () => {
            await paymentPage.verifyUserDetails(testData.user2.username);
            await paymentPage.verifyTotalAmount(totalAmount!);
            await paymentPage.clickNextButton();
            await paymentPage.paymentMethodUserName(testData.user2.username);
            await paymentPage.paymentMethodpassword(testData.user2.password);
            await paymentPage.clickPayNow();
            await page.waitForLoadState();
        });

        //Order confirmation
        await test.step('Verify Order confirmation page details', async () => {
            await paymentPage.orderConfirmMessage();
            await paymentPage.shippingToName(testData.user2.username);
            await paymentPage.totalAmount(totalAmount!);
        });

    });

});
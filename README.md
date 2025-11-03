# playwright-ecom-automation-mozilor

# Playwright E-commerce E2E Test Automation Suite using Typescript
✨ Author: Suvidha Soman

## Overview

This suite automates the end-to-end user flow for a sample e-commerce application, covering:
- Account creation  
- User login and logout  
- Add-to-cart and checkout process  
- Payment and redirection handling  

The design ensures modularity and easy maintenance using:
- **Playwright Test Runner**
- **Page Object Model (POM)**
- **Reusable utilities and test data JSON**

----------------------------------------------------------------------------------------------------

## Prerequisites

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/downloads)

---

## 🧩 Install playwright

npm init playwright@latest

## Install Dependencies

## Allure reports 
npm install -D allure-playwright
npm install -g allure-commandline

## Project structure
📦 playwright-e2e-suite
 ┣ 📂 tests
 ┃ ┣ Login.spec.ts
 ┃ ┗ AddToCart.spec.ts
 ┣ 📂 pages
 ┃ ┣ BasePage.ts
 ┃ ┣ CartPage.ts
 ┃ ┣ CreateAccountPage.ts
 ┃ ┣ HomePage.ts
 ┃ ┣ PaymentPage.ts
 ┃ ┣ ProductDetailPage.ts
 ┃ ┣ ProductListingPage.ts
 ┃ ┗ SignInPage.ts
 ┣ 📂 utils
 ┃ ┗ Helper.ts
 ┣ 📂 data
 ┃ ┗ testData.json
 ┣ playwright.config.ts
 ┗ README.md

## Running Tests(configured in package.json)

## Run All Tests
npm run test

## Generate allure reprots aftre running
npm run allure:generate
npm run allure:open 

## Other commands that can also be used to run 

## Run Tests in a Specific File
npx playwright test tests/Login.spec.ts

## Run Tests with a Specific Browser
npx playwright test --project=chromium

## using grep command
npx playwright test --grep Add to Cart Flow
npx playwright test --grep User Login Flow


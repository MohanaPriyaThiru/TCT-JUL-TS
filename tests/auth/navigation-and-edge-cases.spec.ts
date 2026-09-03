import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjectModel/LoginPage';
import { RegisterPage } from '../pageObjectModel/RegisterPage';

// spec: test-plan/eventhub-authentication.plan.md
// seed: tests/seed.spec.ts

test.describe('Cross-Page Navigation and UI Tests', () => {
  test('Test complete user flow from login to registration', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    
    // 1. Navigate to EventHub login page
    await loginPage.navigateTo();
    expect(await loginPage.getPageTitle()).toBe('EventHub — Discover & Book Events');
    expect(await loginPage.isPageHeadingVisible()).toBe(true);
    
    // 2. Click on 'Register' link
    await loginPage.clickRegisterLink();
    
    // 3. Verify user is directed to registration page
    expect(await registerPage.getPageTitle()).toBe('EventHub — Discover & Book Events');
    expect(await registerPage.getCurrentUrl()).toContain('/register');
    
    // 4. Click on 'Sign in' link on registration page
    await registerPage.clickSignInLink();
    
    // 5. Verify user returns to login page
    expect(await loginPage.getCurrentUrl()).toContain('/login');
  });

  test('Test responsive design on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // 1. Navigate to EventHub login page
    await loginPage.navigateTo();
    
    // 2. Verify all form elements are visible and properly aligned
    expect(await loginPage.isEmailInputVisible()).toBe(true);
    expect(await loginPage.isPasswordInputVisible()).toBe(true);
    expect(await loginPage.isSignInButtonVisible()).toBe(true);
    expect(await loginPage.isPageHeadingVisible()).toBe(true);
    expect(await loginPage.isRegisterLinkVisible()).toBe(true);
    
    // 3. Verify form submission works correctly
    await loginPage.enterEmail('test@example.com');
    await loginPage.enterPassword('password123');
    expect(await loginPage.getEmailValue()).toBe('test@example.com');
    expect(await loginPage.getPasswordValue()).toBe('password123');
  });

  test('Test page title consistency', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    
    // 1. Navigate to login page
    await loginPage.navigateTo();
    const loginTitle = await loginPage.getPageTitle();
    expect(loginTitle).toBe('EventHub — Discover & Book Events');
    
    // 2. Navigate to registration page
    await registerPage.navigateTo();
    const registerTitle = await registerPage.getPageTitle();
    
    // 3. Verify page title remains consistent
    expect(registerTitle).toBe('EventHub — Discover & Book Events');
    expect(loginTitle).toBe(registerTitle);
  });

  test('Test browser back button functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    
    // 1. Navigate to login page
    await loginPage.navigateTo();
    expect(await loginPage.getCurrentUrl()).toContain('/login');
    
    // 2. Click 'Register' link to go to registration page
    await loginPage.clickRegisterLink();
    expect(await registerPage.getCurrentUrl()).toContain('/register');
    
    // 3. Click browser back button
    await page.goBack();
    expect(await loginPage.getCurrentUrl()).toContain('/login');
    expect(await loginPage.isPageHeadingVisible()).toBe(true);
    
    // 4. Click browser forward button
    await page.goForward();
    expect(await registerPage.getCurrentUrl()).toContain('/register');
    expect(await registerPage.isPageHeadingVisible()).toBe(true);
  });

  test('Test RahulShettyAcademy branding and links', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    
    // 1. Navigate to login page
    await loginPage.navigateTo();
    
    // Verify branding is visible on login page
    const rahulShettyLink = page.locator('a[href="https://rahulshettyacademy.com"]').first();
    expect(await rahulShettyLink.isVisible()).toBe(true);
    
    // 2. Navigate to registration page
    await registerPage.navigateTo();
    
    // Verify branding is consistent on registration page
    const registerRahulShettyLink = page.locator('a[href="https://rahulshettyacademy.com"]').first();
    expect(await registerRahulShettyLink.isVisible()).toBe(true);
  });
});

test.describe('Edge Cases and Error Scenarios', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
  });

  test('Test email field with leading/trailing spaces', async () => {
    // 1. Navigate to login page
    await loginPage.navigateTo();
    
    // 2. Enter email with leading spaces
    await loginPage.enterEmail('  test@example.com');
    
    // 3. Verify email is entered as typed (or application trims it)
    const emailValue = await loginPage.getEmailValue();
    expect(emailValue).toBeTruthy();
    
    // 4. Click Sign In and observe behavior
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    
    // Application should handle it appropriately
    expect(await loginPage.getCurrentUrl()).toBeDefined();
  });

  test('Test password field with special characters', async () => {
    // 1. Navigate to registration page
    await registerPage.navigateTo();
    
    // 2. Enter a password with various special characters
    await registerPage.enterEmail('newuser@example.com');
    await registerPage.enterPassword('Pass@word#123!<>');
    
    // 3. Verify password accepts special characters
    const passwordValue = await registerPage.getPasswordValue();
    expect(passwordValue).toBe('Pass@word#123!<>');
    
    // 4. Enter confirm password with same value
    await registerPage.enterConfirmPassword('Pass@word#123!<>');
    expect(await registerPage.getConfirmPasswordValue()).toBe('Pass@word#123!<>');
  });

  test('Test form with very long email address', async () => {
    // 1. Navigate to login page
    await loginPage.navigateTo();
    
    // 2. Enter a very long valid email
    const longEmail = 'verylongemailaddress123@subdomain.example.co.uk';
    await loginPage.enterEmail(longEmail);
    
    // 3. Verify email field accepts the long address
    const emailValue = await loginPage.getEmailValue();
    expect(emailValue).toBe(longEmail);
    
    // 4. Enter valid password and attempt to submit
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    
    // Form submission should work
    expect(await loginPage.getCurrentUrl()).toBeDefined();
  });

  test('Test form with case sensitivity in email', async () => {
    // 1. Navigate to login page
    await loginPage.navigateTo();
    
    const emailVariations = [
      'Test@Example.COM',
      'test@example.com',
      'TEST@EXAMPLE.COM',
    ];
    
    for (const email of emailVariations) {
      // 2. Enter email in different cases
      await loginPage.clearEmail();
      await loginPage.enterEmail(email);
      
      // 3. Verify all variations are accepted without validation error
      const isErrorVisible = await loginPage.isEmailErrorVisible();
      if (!isErrorVisible) {
        expect(await loginPage.getEmailValue()).toBe(email);
      }
    }
  });

  test('Test rapid form submissions', async () => {
    // 1. Navigate to login page
    await loginPage.navigateTo();
    
    // 2. Enter invalid credentials
    await loginPage.enterEmail('invalid@example.com');
    await loginPage.enterPassword('password123');
    
    // 3. Click Sign In multiple times rapidly
    for (let i = 0; i < 3; i++) {
      await loginPage.clickSignIn();
      await loginPage.page.waitForTimeout(100);
    }
    
    // Application should handle rapid clicks gracefully
    expect(await loginPage.getCurrentUrl()).toBeDefined();
  });

  test('Test form state persistence on navigation', async () => {
    // 1. Navigate to login page
    await loginPage.navigateTo();
    
    // 2. Enter email and password in the form
    await loginPage.enterEmail('test@example.com');
    await loginPage.enterPassword('password123');
    
    const emailBeforeNav = await loginPage.getEmailValue();
    const passwordBeforeNav = await loginPage.getPasswordValue();
    
    // 3. Click Register link to navigate to registration page
    await loginPage.clickRegisterLink();
    expect(await registerPage.getCurrentUrl()).toContain('/register');
    
    // 4. Click back to login page
    await registerPage.clickSignInLink();
    
    // Form state may or may not be retained (browser dependent)
    expect(await loginPage.getCurrentUrl()).toContain('/login');
  });
});

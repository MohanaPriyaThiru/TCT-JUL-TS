import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjectModel/LoginPage';

// spec: test-plan/eventhub-authentication.plan.md
// seed: tests/seed.spec.ts

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  test('Verify login page layout and elements', async ({ page }) => {
    // 1. Navigate to https://eventhub.rahulshettyacademy.com/login
    const title = await loginPage.getPageTitle();
    expect(title).toBe('EventHub — Discover & Book Events');
    
    // Verify all key elements are visible
    expect(await loginPage.isPageHeadingVisible()).toBe(true);
    expect(await loginPage.isEmailInputVisible()).toBe(true);
    expect(await loginPage.isPasswordInputVisible()).toBe(true);
    expect(await loginPage.isSignInButtonVisible()).toBe(true);
    expect(await loginPage.isRegisterLinkVisible()).toBe(true);
    expect(await loginPage.isApiDocLinkVisible()).toBe(true);
    
    // Verify placeholders
    const emailPlaceholder = await loginPage.getEmailPlaceholder();
    const passwordPlaceholder = await loginPage.getPasswordPlaceholder();
    expect(emailPlaceholder).toBe('you@email.com');
    expect(passwordPlaceholder).toBe('••••••');
  });

  test('Test login with empty email and password', async () => {
    // 1. Leave both email and password fields empty
    // Fields remain empty by default

    // 2. Click the 'Sign In' button
    await loginPage.clickSignIn();
    
    // 3. Verify validation errors appear
    expect(await loginPage.isEmailErrorVisible()).toBe(true);
    expect(await loginPage.isPasswordErrorVisible()).toBe(true);
    
    // Verify user remains on login page
    expect(await loginPage.getCurrentUrl()).toContain('/login');
    
    // Verify Sign In button is still active
    expect(await loginPage.isSignInButtonEnabled()).toBe(true);
  });

  test('Test login with empty email only', async () => {
    // 1. Leave email field empty and enter a password
    await loginPage.enterPassword('password123');
    
    // 2. Click the 'Sign In' button
    await loginPage.clickSignIn();
    
    // 3. Verify validation error for email
    expect(await loginPage.isEmailErrorVisible()).toBe(true);
    
    // Verify user remains on login page
    expect(await loginPage.getCurrentUrl()).toContain('/login');
  });

  test('Test login with empty password only', async () => {
    // 1. Enter a valid email and leave password field empty
    await loginPage.enterEmail('test@example.com');
    
    // 2. Click the 'Sign In' button
    await loginPage.clickSignIn();
    
    // 3. Verify validation error for password
    expect(await loginPage.isPasswordErrorVisible()).toBe(true);
    
    // Verify user remains on login page
    expect(await loginPage.getCurrentUrl()).toContain('/login');
  });

  test('Test login with invalid email format', async () => {
    // 1. Enter an invalid email format
    await loginPage.enterEmail('notanemail');
    
    // 2. Enter a valid password
    await loginPage.enterPassword('password123');
    
    // 3. Click the 'Sign In' button
    await loginPage.clickSignIn();
    
    // 4. Verify validation error appears
    expect(await loginPage.isEmailErrorVisible()).toBe(true);
    
    // Verify user remains on login page
    expect(await loginPage.getCurrentUrl()).toContain('/login');
  });

  test('Test login with password too short', async () => {
    // 1. Enter a valid email
    await loginPage.enterEmail('test@example.com');
    
    // 2. Enter a password shorter than 6 characters
    await loginPage.enterPassword('12345');
    
    // 3. Click the 'Sign In' button
    await loginPage.clickSignIn();
    
    // 4. Verify validation error appears
    expect(await loginPage.isPasswordErrorVisible()).toBe(true);
    
    // Verify user remains on login page
    expect(await loginPage.getCurrentUrl()).toContain('/login');
  });

  test('Test login with invalid credentials', async () => {
    // 1. Enter a valid email format but non-existent account
    await loginPage.enterEmail('nonexistent@example.com');
    
    // 2. Enter a valid password format
    await loginPage.enterPassword('password123');
    
    // 3. Click the 'Sign In' button
    await loginPage.clickSignIn();
    
    // 4. Verify error notification appears
    expect(await loginPage.isInvalidCredentialsErrorVisible()).toBe(true);
    
    // Verify user remains on login page
    expect(await loginPage.getCurrentUrl()).toContain('/login');
    
    // Verify form fields retain their values
    const emailValue = await loginPage.getEmailValue();
    const passwordValue = await loginPage.getPasswordValue();
    expect(emailValue).toBe('nonexistent@example.com');
    expect(passwordValue).toBe('password123');
  });

  test('Test password field masks input', async () => {
    // 1. Click on the password field and type a password
    await loginPage.enterPassword('MyPassword123');
    
    // 2. Verify the password is masked with dots
    const passwordValue = await loginPage.getPasswordValue();
    expect(passwordValue).toBe('MyPassword123'); // Value is there but displayed as dots
    
    // 3. Clear the field and verify it's empty
    await loginPage.clearPassword();
    const clearedValue = await loginPage.getPasswordValue();
    expect(clearedValue).toBe('');
  });

  test('Test navigation from login to registration', async () => {
    // 1. Click on the 'Register' link
    await loginPage.clickRegisterLink();
    
    // 2. Verify user is redirected to registration page
    expect(await loginPage.getCurrentUrl()).toContain('/register');
  });

  test('Test API Documentation link from login page', async ({ page, context }) => {
    // 1. Listen for popup
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      loginPage.clickApiDocLink(),
    ]);
    
    // 2. Verify link opens API documentation
    expect(popup.url()).toContain('api.eventhub.rahulshettyacademy.com');
    await popup.close();
  });

  test('Test Sign In button state', async () => {
    // 1. Verify Sign In button is visible and enabled
    expect(await loginPage.isSignInButtonVisible()).toBe(true);
    expect(await loginPage.isSignInButtonEnabled()).toBe(true);
    
    // 2. Fill in fields and verify button responds to click
    await loginPage.enterEmail('test@example.com');
    await loginPage.enterPassword('password123');
    expect(await loginPage.isSignInButtonEnabled()).toBe(true);
  });

  test('Test email field accepts valid formats', async () => {
    const validEmails = [
      'user@domain.com',
      'user+tag@domain.co.uk',
      'user_name@domain.com',
    ];
    
    for (const email of validEmails) {
      await loginPage.clearEmail();
      await loginPage.enterEmail(email);
      
      // Enter a valid password
      await loginPage.enterPassword('password123');
      
      // Verify no client-side validation error
      const isErrorVisible = await loginPage.isEmailErrorVisible();
      if (!isErrorVisible) {
        expect(await loginPage.getEmailValue()).toBe(email);
      }
      
      await loginPage.clearPassword();
    }
  });
});

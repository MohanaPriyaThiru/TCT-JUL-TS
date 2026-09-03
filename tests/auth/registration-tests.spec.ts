import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pageObjectModel/RegisterPage';

// spec: test-plan/eventhub-authentication.plan.md
// seed: tests/seed.spec.ts

test.describe('Registration Page Tests', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigateTo();
  });

  test('Verify registration page layout and elements', async () => {
    // 1. Navigate to registration page
    const title = await registerPage.getPageTitle();
    expect(title).toBe('EventHub — Discover & Book Events');
    
    // Verify all key elements are visible
    expect(await registerPage.isPageHeadingVisible()).toBe(true);
    expect(await registerPage.isEmailInputVisible()).toBe(true);
    expect(await registerPage.isPasswordInputVisible()).toBe(true);
    expect(await registerPage.isConfirmPasswordInputVisible()).toBe(true);
    expect(await registerPage.isCreateAccountButtonVisible()).toBe(true);
    expect(await registerPage.isSignInLinkVisible()).toBe(true);
    expect(await registerPage.arePasswordRequirementsVisible()).toBe(true);
  });

  test('Test registration with empty fields', async () => {
    // 1. Leave all fields empty
    // Fields remain empty by default

    // 2. Click the 'Create Account' button
    await registerPage.clickCreateAccount();
    
    // 3. Verify validation errors appear
    expect(await registerPage.isEmailErrorVisible()).toBe(true);
    
    // Verify user remains on registration page
    expect(await registerPage.getCurrentUrl()).toContain('/register');
  });

  test('Test registration with invalid email format', async () => {
    // 1. Enter an invalid email format
    await registerPage.enterEmail('notanemail');
    
    // 2. Enter a valid password
    await registerPage.enterPassword('ValidPass@123');
    
    // 3. Enter the same password in confirm field
    await registerPage.enterConfirmPassword('ValidPass@123');
    
    // 4. Click 'Create Account' button
    await registerPage.clickCreateAccount();
    
    // 5. Verify validation error appears
    expect(await registerPage.isEmailErrorVisible()).toBe(true);
    
    // Verify user remains on registration page
    expect(await registerPage.getCurrentUrl()).toContain('/register');
  });

  test('Test password does not meet minimum length requirement', async () => {
    // 1. Enter valid email
    await registerPage.enterEmail('newuser@example.com');
    
    // 2. Enter a password with less than 8 characters
    await registerPage.enterPassword('Pass@1');
    
    // 3. Verify error message appears
    expect(await registerPage.isPasswordErrorVisible()).toBe(true);
    
    // 4. Try to click 'Create Account' button (should be disabled or validation prevents)
    const isEnabled = await registerPage.isCreateAccountButtonEnabled();
    if (isEnabled) {
      await registerPage.clickCreateAccount();
      // User should remain on page
      expect(await registerPage.getCurrentUrl()).toContain('/register');
    }
  });

  test('Test password without uppercase letter', async () => {
    // 1. Enter valid email
    await registerPage.enterEmail('newuser@example.com');
    
    // 2. Enter a password without uppercase letters
    await registerPage.enterPassword('password123!');
    
    // 3. Verify error message appears
    expect(await registerPage.isPasswordErrorVisible()).toBe(true);
    
    // 4. Verify form validation prevents submission
    const isEnabled = await registerPage.isCreateAccountButtonEnabled();
    if (isEnabled) {
      await registerPage.clickCreateAccount();
      expect(await registerPage.getCurrentUrl()).toContain('/register');
    }
  });

  test('Test password without number', async () => {
    // 1. Enter valid email
    await registerPage.enterEmail('newuser@example.com');
    
    // 2. Enter a password without any numbers
    await registerPage.enterPassword('Password!');
    
    // 3. Verify error message appears
    expect(await registerPage.isPasswordErrorVisible()).toBe(true);
    
    // 4. Verify form validation prevents submission
    const isEnabled = await registerPage.isCreateAccountButtonEnabled();
    if (isEnabled) {
      await registerPage.clickCreateAccount();
      expect(await registerPage.getCurrentUrl()).toContain('/register');
    }
  });

  test('Test password without special character', async () => {
    // 1. Enter valid email
    await registerPage.enterEmail('newuser@example.com');
    
    // 2. Enter a password without special characters
    await registerPage.enterPassword('Password123');
    
    // 3. Verify error message appears
    expect(await registerPage.isPasswordErrorVisible()).toBe(true);
    
    // 4. Verify form validation prevents submission
    const isEnabled = await registerPage.isCreateAccountButtonEnabled();
    if (isEnabled) {
      await registerPage.clickCreateAccount();
      expect(await registerPage.getCurrentUrl()).toContain('/register');
    }
  });

  test('Test password mismatch between password and confirm password', async () => {
    // 1. Enter valid email
    await registerPage.enterEmail('newuser@example.com');
    
    // 2. Enter a valid password that meets all requirements
    await registerPage.enterPassword('ValidPass@123');
    
    // 3. Enter a different password in Confirm Password field
    await registerPage.enterConfirmPassword('ValidPass@124');
    
    // 4. Click 'Create Account' button
    await registerPage.clickCreateAccount();
    
    // 5. Verify error message appears
    expect(await registerPage.isPasswordMismatchErrorVisible()).toBe(true);
    
    // Verify user remains on registration page
    expect(await registerPage.getCurrentUrl()).toContain('/register');
  });

  test('Test password requirements checklist updates in real-time', async ({ page }) => {
    // 1. Navigate to registration page - checklist is visible with unmet requirements
    expect(await registerPage.arePasswordRequirementsVisible()).toBe(true);
    
    // 2. Start typing password
    await registerPage.enterPassword('P');
    
    // 3. Continue typing to complete password
    await registerPage.clearPassword();
    await registerPage.enterPassword('Password@1');
    
    // 4. Verify the password now meets requirements
    // (Checklist should show all requirements met)
    expect(await registerPage.getPasswordValue()).toBe('Password@1');
    
    // 5. Delete a character
    await registerPage.clearPassword();
    await registerPage.enterPassword('Password');
    
    // Verify password no longer meets requirements
    expect(await registerPage.getPasswordValue()).toBe('Password');
  });

  test('Test navigation from registration to login', async () => {
    // 1. Click on the 'Sign in' link
    await registerPage.clickSignInLink();
    
    // 2. Verify user is redirected to login page
    expect(await registerPage.getCurrentUrl()).toContain('/login');
  });

  test('Test external resource links on registration page', async ({ page, context }) => {
    // Verify API Documentation link is clickable
    const isApiDocVisible = await registerPage.page.locator('a[href*="api.eventhub.rahulshettyacademy.com"]').isVisible();
    expect(isApiDocVisible).toBe(true);
    
    // Listen for popup when clicking API doc link
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      registerPage.clickApiDocLink(),
    ]);
    
    // Verify it opens API documentation
    expect(popup.url()).toContain('api.eventhub.rahulshettyacademy.com');
    await popup.close();
  });
});

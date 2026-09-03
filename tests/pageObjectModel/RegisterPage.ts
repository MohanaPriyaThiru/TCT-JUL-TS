import { Page, Locator } from '@playwright/test';

/**
 * RegisterPage - Page Object Model for EventHub Registration Page
 * Handles all interactions with the registration page elements
 */
export class RegisterPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createAccountButton: Locator;
  readonly signInLink: Locator;
  readonly pageHeading: Locator;
  readonly emailErrorMsg: Locator;
  readonly passwordErrorMsg: Locator;
  readonly passwordMismatchMsg: Locator;
  readonly at8CharsCheckbox: Locator;
  readonly uppercaseCheckbox: Locator;
  readonly numberCheckbox: Locator;
  readonly specialCharCheckbox: Locator;
  readonly passwordRequirementsText: Locator;
  readonly apiDocLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[placeholder="you@email.com"]');
    this.passwordInput = page.locator('input[placeholder="Min 8 chars, uppercase, number & symbol"]');
    this.confirmPasswordInput = page.locator('input[placeholder="Repeat your password"]');
    this.createAccountButton = page.locator('button:has-text("Create Account")');
    this.signInLink = page.locator('a[href="/login"]');
    this.pageHeading = page.locator('heading:has-text("Create your account")');
    this.emailErrorMsg = page.locator('text=Enter a valid email');
    this.passwordErrorMsg = page.locator('text=Password does not meet the requirements below');
    this.passwordMismatchMsg = page.locator('text=Passwords do not match');
    this.at8CharsCheckbox = page.locator('listitem:has-text("At least 8 characters")');
    this.uppercaseCheckbox = page.locator('listitem:has-text("One uppercase letter")');
    this.numberCheckbox = page.locator('listitem:has-text("One number")');
    this.specialCharCheckbox = page.locator('listitem:has-text("One special character")');
    this.passwordRequirementsText = page.locator('text=Password does not meet the requirements below');
    this.apiDocLink = page.locator('a[href*="api.eventhub.rahulshettyacademy.com"]').first();
  }

  /**
   * Navigate to the registration page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/register');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Enter email address
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Enter confirm password
   */
  async enterConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  /**
   * Click Create Account button
   */
  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
    await this.page.waitForTimeout(1000); // Wait for server response
  }

  /**
   * Click Sign In link
   */
  async clickSignInLink(): Promise<void> {
    await this.signInLink.click();
  }

  /**
   * Click API Documentation link
   */
  async clickApiDocLink(): Promise<void> {
    await this.apiDocLink.click();
  }

  /**
   * Check if email error is visible
   */
  async isEmailErrorVisible(): Promise<boolean> {
    return await this.emailErrorMsg.isVisible();
  }

  /**
   * Check if password error is visible
   */
  async isPasswordErrorVisible(): Promise<boolean> {
    return await this.passwordErrorMsg.isVisible();
  }

  /**
   * Check if password mismatch error is visible
   */
  async isPasswordMismatchErrorVisible(): Promise<boolean> {
    return await this.passwordMismatchMsg.isVisible();
  }

  /**
   * Get email input value
   */
  async getEmailValue(): Promise<string | null> {
    return await this.emailInput.inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue(): Promise<string | null> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Get confirm password input value
   */
  async getConfirmPasswordValue(): Promise<string | null> {
    return await this.confirmPasswordInput.inputValue();
  }

  /**
   * Check if Create Account button is enabled
   */
  async isCreateAccountButtonEnabled(): Promise<boolean> {
    return await this.createAccountButton.isEnabled();
  }

  /**
   * Check if Create Account button is visible
   */
  async isCreateAccountButtonVisible(): Promise<boolean> {
    return await this.createAccountButton.isVisible();
  }

  /**
   * Check if page heading is visible
   */
  async isPageHeadingVisible(): Promise<boolean> {
    return await this.pageHeading.isVisible();
  }

  /**
   * Check if sign in link is visible
   */
  async isSignInLinkVisible(): Promise<boolean> {
    return await this.signInLink.isVisible();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Clear email field
   */
  async clearEmail(): Promise<void> {
    await this.emailInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  /**
   * Clear confirm password field
   */
  async clearConfirmPassword(): Promise<void> {
    await this.confirmPasswordInput.clear();
  }

  /**
   * Perform complete registration
   */
  async register(email: string, password: string, confirmPassword: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword);
    await this.clickCreateAccount();
  }

  /**
   * Check if email input is visible
   */
  async isEmailInputVisible(): Promise<boolean> {
    return await this.emailInput.isVisible();
  }

  /**
   * Check if password input is visible
   */
  async isPasswordInputVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  /**
   * Check if confirm password input is visible
   */
  async isConfirmPasswordInputVisible(): Promise<boolean> {
    return await this.confirmPasswordInput.isVisible();
  }

  /**
   * Check if 8 chars requirement is met
   */
  async is8CharsRequirementMet(): Promise<boolean> {
    return await this.at8CharsCheckbox.locator('..').innerHTML().then(html => html.includes('✓'));
  }

  /**
   * Check if uppercase requirement is met
   */
  async isUppercaseRequirementMet(): Promise<boolean> {
    return await this.uppercaseCheckbox.locator('..').innerHTML().then(html => html.includes('✓'));
  }

  /**
   * Check if number requirement is met
   */
  async isNumberRequirementMet(): Promise<boolean> {
    return await this.numberCheckbox.locator('..').innerHTML().then(html => html.includes('✓'));
  }

  /**
   * Check if special char requirement is met
   */
  async isSpecialCharRequirementMet(): Promise<boolean> {
    return await this.specialCharCheckbox.locator('..').innerHTML().then(html => html.includes('✓'));
  }

  /**
   * Wait for error messages to appear
   */
  async waitForErrorMessages(): Promise<void> {
    await Promise.race([
      this.emailErrorMsg.waitFor({ timeout: 2000 }).catch(() => null),
      this.passwordErrorMsg.waitFor({ timeout: 2000 }).catch(() => null),
    ]);
  }

  /**
   * Check if all password requirements are visible
   */
  async arePasswordRequirementsVisible(): Promise<boolean> {
    return (
      (await this.at8CharsCheckbox.isVisible()) &&
      (await this.uppercaseCheckbox.isVisible()) &&
      (await this.numberCheckbox.isVisible()) &&
      (await this.specialCharCheckbox.isVisible())
    );
  }
}

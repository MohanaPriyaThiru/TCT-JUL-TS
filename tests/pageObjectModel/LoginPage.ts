import { Page, Locator } from '@playwright/test';

/**
 * LoginPage - Page Object Model for EventHub Login Page
 * Handles all interactions with the login page elements
 */
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly registerLink: Locator;
  readonly apiDocLink: Locator;
  readonly pageHeading: Locator;
  readonly emailErrorMsg: Locator;
  readonly passwordErrorMsg: Locator;
  readonly invalidCredentialsNotification: Locator;
  readonly dismissButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[placeholder="you@email.com"]');
    this.passwordInput = page.locator('input[placeholder="••••••"]');
    this.signInButton = page.locator('button:has-text("Sign In")');
    this.registerLink = page.locator('a[href="/register"]');
    this.apiDocLink = page.locator('a[href*="api.eventhub.rahulshettyacademy.com"]').first();
    this.pageHeading = page.locator('heading:has-text("Sign in to EventHub")');
    this.emailErrorMsg = page.locator('text=Enter a valid email');
    this.passwordErrorMsg = page.locator('text=Password must be at least 6 characters');
    this.invalidCredentialsNotification = page.locator('text=Invalid email or password');
    this.dismissButton = page.locator('button:has-text("×")');
  }

  /**
   * Navigate to the login page
   */
  async navigateTo(): Promise<void> {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
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
   * Click Sign In button
   */
  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
    await this.page.waitForTimeout(1000); // Wait for server response
  }

  /**
   * Click Register link
   */
  async clickRegisterLink(): Promise<void> {
    await this.registerLink.click();
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
   * Check if invalid credentials error is visible
   */
  async isInvalidCredentialsErrorVisible(): Promise<boolean> {
    return await this.invalidCredentialsNotification.isVisible();
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
   * Check if Sign In button is enabled
   */
  async isSignInButtonEnabled(): Promise<boolean> {
    return await this.signInButton.isEnabled();
  }

  /**
   * Check if Sign In button is visible
   */
  async isSignInButtonVisible(): Promise<boolean> {
    return await this.signInButton.isVisible();
  }

  /**
   * Check if page heading is visible
   */
  async isPageHeadingVisible(): Promise<boolean> {
    return await this.pageHeading.isVisible();
  }

  /**
   * Check if register link is visible
   */
  async isRegisterLinkVisible(): Promise<boolean> {
    return await this.registerLink.isVisible();
  }

  /**
   * Check if API doc link is visible
   */
  async isApiDocLinkVisible(): Promise<boolean> {
    return await this.apiDocLink.isVisible();
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
   * Perform complete login
   */
  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
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
   * Get email placeholder
   */
  async getEmailPlaceholder(): Promise<string | null> {
    return await this.emailInput.getAttribute('placeholder');
  }

  /**
   * Get password placeholder
   */
  async getPasswordPlaceholder(): Promise<string | null> {
    return await this.passwordInput.getAttribute('placeholder');
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
}

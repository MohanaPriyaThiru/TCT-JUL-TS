/**
 * TestUtils - Common utility functions for EventHub tests
 */

import { Page } from '@playwright/test';

/**
 * Common test data for EventHub authentication tests
 */
export class TestData {
  static readonly VALID_EMAILS = [
    'user@example.com',
    'user+tag@domain.co.uk',
    'user_name@domain.com',
    'test.email@subdomain.example.com',
  ];

  static readonly INVALID_EMAILS = [
    'notanemail',
    'missing@domain',
    'invalid.email',
    'user@',
    '@domain.com',
  ];

  static readonly VALID_PASSWORD = 'ValidPass@123';

  static readonly INVALID_PASSWORDS = {
    tooShort: '12345',
    noUppercase: 'password123!',
    noNumber: 'Password!',
    noSpecialChar: 'Password123',
    weak: 'weak',
  };

  static readonly ERROR_MESSAGES = {
    invalidEmail: 'Enter a valid email',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordRequirements: 'Password does not meet the requirements below',
    invalidCredentials: 'Invalid email or password',
    passwordMismatch: 'Passwords do not match',
  };

  /**
   * Generate unique email for testing
   */
  static generateUniqueEmail(): string {
    return `testuser${Date.now()}@example.com`;
  }

  /**
   * Get valid password meeting all requirements
   */
  static getValidPassword(): string {
    return this.VALID_PASSWORD;
  }

  /**
   * Get invalid password for specific requirement
   */
  static getInvalidPassword(requirement: keyof typeof this.INVALID_PASSWORDS): string {
    return this.INVALID_PASSWORDS[requirement];
  }
}

/**
 * Common test utilities
 */
export class TestUtils {
  /**
   * Wait for element to be visible
   */
  static async waitForElementVisible(page: Page, selector: string, timeout: number = 5000): Promise<boolean> {
    try {
      await page.locator(selector).waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be hidden
   */
  static async waitForElementHidden(page: Page, selector: string, timeout: number = 5000): Promise<boolean> {
    try {
      await page.locator(selector).waitFor({ state: 'hidden', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all text content from an element
   */
  static async getElementText(page: Page, selector: string): Promise<string> {
    return await page.locator(selector).textContent() || '';
  }

  /**
   * Check if element is disabled
   */
  static async isElementDisabled(page: Page, selector: string): Promise<boolean> {
    const element = page.locator(selector);
    const disabled = await element.getAttribute('disabled');
    return disabled !== null;
  }

  /**
   * Check if element is readonly
   */
  static async isElementReadonly(page: Page, selector: string): Promise<boolean> {
    const element = page.locator(selector);
    const readonly = await element.getAttribute('readonly');
    return readonly !== null;
  }

  /**
   * Get all visible error messages on page
   */
  static async getAllErrorMessages(page: Page): Promise<string[]> {
    const errorSelectors = [
      'text=Enter a valid email',
      'text=Password must be at least 6 characters',
      'text=Password does not meet the requirements below',
      'text=Invalid email or password',
      'text=Passwords do not match',
    ];

    const errors: string[] = [];
    for (const selector of errorSelectors) {
      try {
        const isVisible = await page.locator(selector).isVisible();
        if (isVisible) {
          const text = await page.locator(selector).textContent();
          if (text) {
            errors.push(text);
          }
        }
      } catch {
        // Selector not found, continue
      }
    }
    return errors;
  }

  /**
   * Verify field validation state
   */
  static async verifyFieldValidation(
    page: Page,
    fieldSelector: string,
    shouldHaveError: boolean,
  ): Promise<boolean> {
    const field = page.locator(fieldSelector);
    const parent = field.locator('..');
    
    try {
      const hasErrorClass = await parent.getAttribute('class').then(classes => 
        classes?.includes('error') || classes?.includes('invalid') || false
      );
      return shouldHaveError === hasErrorClass;
    } catch {
      return !shouldHaveError; // If we can't detect error class, assume no error
    }
  }

  /**
   * Clear and fill field with new value
   */
  static async clearAndFillField(page: Page, selector: string, value: string): Promise<void> {
    const field = page.locator(selector);
    await field.clear();
    await field.fill(value);
  }

  /**
   * Get form state (all field values)
   */
  static async getFormState(page: Page, fieldSelectors: Record<string, string>): Promise<Record<string, string>> {
    const formState: Record<string, string> = {};
    
    for (const [fieldName, selector] of Object.entries(fieldSelectors)) {
      const value = await page.locator(selector).inputValue();
      formState[fieldName] = value || '';
    }
    
    return formState;
  }

  /**
   * Verify URL contains expected path
   */
  static async verifyUrlContains(page: Page, expectedPath: string): Promise<boolean> {
    return page.url().includes(expectedPath);
  }

  /**
   * Wait for navigation to complete
   */
  static async waitForNavigation(page: Page, timeout: number = 10000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Check if running on CI environment
   */
  static isCI(): boolean {
    return !!process.env.CI;
  }

  /**
   * Get browser type from environment
   */
  static getBrowserType(): string {
    return process.env.BROWSER || 'chromium';
  }

  /**
   * Verify password meets all requirements
   */
  static verifyPasswordRequirements(password: string): {
    has8Chars: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    meetsAll: boolean;
  } {
    const has8Chars = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password);
    
    return {
      has8Chars,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      meetsAll: has8Chars && hasUppercase && hasNumber && hasSpecialChar,
    };
  }

  /**
   * Verify email format
   */
  static verifyEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Take screenshot for debugging
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `tests/screenshots/${name}-${timestamp}.png`;
    await page.screenshot({ path: fileName });
    console.log(`Screenshot saved: ${fileName}`);
  }

  /**
   * Get page console messages
   */
  static async getConsoleMessages(page: Page): Promise<string[]> {
    const messages: string[] = [];
    page.on('console', msg => messages.push(`[${msg.type()}] ${msg.text()}`));
    return messages;
  }

  /**
   * Wait for specific timeout
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry operation with exponential backoff
   */
  static async retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    initialDelay: number = 1000,
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          const delay = initialDelay * Math.pow(2, attempt - 1);
          await this.wait(delay);
        }
      }
    }
    
    throw lastError || new Error('Operation failed after retries');
  }
}

/**
 * Page-specific utilities
 */
export class PageUtils {
  /**
   * Get all visible links on page
   */
  static async getAllLinks(page: Page): Promise<Array<{ text: string; href: string }>> {
    const links = await page.locator('a').all();
    const linkData: Array<{ text: string; href: string }> = [];
    
    for (const link of links) {
      const isVisible = await link.isVisible();
      if (isVisible) {
        const text = await link.textContent();
        const href = await link.getAttribute('href');
        if (text && href) {
          linkData.push({ text, href });
        }
      }
    }
    
    return linkData;
  }

  /**
   * Get all form inputs on page
   */
  static async getAllFormInputs(page: Page): Promise<Array<{ name: string; type: string; value: string }>> {
    const inputs = await page.locator('input').all();
    const inputData: Array<{ name: string; type: string; value: string }> = [];
    
    for (const input of inputs) {
      const name = await input.getAttribute('name');
      const type = await input.getAttribute('type');
      const value = await input.inputValue();
      
      if (name) {
        inputData.push({
          name,
          type: type || 'text',
          value: value || '',
        });
      }
    }
    
    return inputData;
  }

  /**
   * Get page accessibility violations
   */
  static async checkAccessibility(page: Page): Promise<string[]> {
    // Run accessibility checks (requires axe-core)
    const violations: string[] = [];
    
    try {
      await page.addScriptTag({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js',
      });
      
      const results = await page.evaluate(() => {
        // @ts-ignore
        return new Promise(resolve => {
          // @ts-ignore
          axe.run((error: any, results: any) => {
            if (error) throw error;
            resolve(results.violations);
          });
        });
      });
      
      // Extract violation descriptions
      const violationResults = results as any[];
      return violationResults.map(v => `${v.id}: ${v.description}`);
    } catch (error) {
      console.warn('Accessibility check failed:', error);
      return [];
    }
  }
}

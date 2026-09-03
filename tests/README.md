# EventHub Authentication Testing Suite

This comprehensive Playwright testing suite covers the authentication flows for EventHub using the Page Object Model (POM) pattern with TypeScript.

## Project Structure

```
tests/
├── pageObjectModel/
│   ├── LoginPage.ts           # POM for login page
│   └── RegisterPage.ts         # POM for registration page
├── auth/
│   ├── login-tests.spec.ts              # Login page test suite
│   ├── registration-tests.spec.ts       # Registration page test suite
│   ├── navigation-and-edge-cases.spec.ts # Navigation and edge case tests
│   └── advanced-validation-tests.spec.ts # Advanced validation scenarios
└── seed.spec.ts               # Optional seed file for test setup
```

## Page Object Models

### LoginPage.ts
Encapsulates all interactions with the EventHub login page:
- Email and password input fields
- Sign In button
- Register link
- Error message verification
- Navigation methods
- Validation checks

**Key Methods:**
- `navigateTo()` - Navigate to login page
- `login(email, password)` - Perform complete login
- `enterEmail()` - Enter email address
- `enterPassword()` - Enter password
- `clickSignIn()` - Click Sign In button
- `isEmailErrorVisible()` - Check email validation error
- `isPasswordErrorVisible()` - Check password validation error
- `isInvalidCredentialsErrorVisible()` - Check invalid credentials error

### RegisterPage.ts
Encapsulates all interactions with the EventHub registration page:
- Email, password, and confirm password fields
- Create Account button
- Sign In link
- Password requirements checklist
- Error message verification
- Validation checks

**Key Methods:**
- `navigateTo()` - Navigate to registration page
- `register(email, password, confirmPassword)` - Perform complete registration
- `enterEmail()` - Enter email address
- `enterPassword()` - Enter password
- `enterConfirmPassword()` - Enter confirm password
- `arePasswordRequirementsVisible()` - Check if requirements list is visible
- `isEmailErrorVisible()` - Check email validation error
- `isPasswordErrorVisible()` - Check password validation error

## Test Suites

### 1. Login Tests (login-tests.spec.ts)
Covers 12 login scenarios:
- ✓ Page layout and elements verification
- ✓ Login with empty email and password
- ✓ Login with empty email only
- ✓ Login with empty password only
- ✓ Login with invalid email format
- ✓ Login with password too short
- ✓ Login with invalid credentials
- ✓ Password field masking
- ✓ Navigation to registration
- ✓ API Documentation link
- ✓ Sign In button state
- ✓ Valid email formats acceptance

### 2. Registration Tests (registration-tests.spec.ts)
Covers 10 registration scenarios:
- ✓ Page layout and elements verification
- ✓ Registration with empty fields
- ✓ Invalid email format handling
- ✓ Password minimum length requirement
- ✓ Uppercase letter requirement
- ✓ Number requirement
- ✓ Special character requirement
- ✓ Password mismatch error
- ✓ Real-time password requirements checklist
- ✓ Navigation to login
- ✓ External resource links

### 3. Navigation and Edge Cases (navigation-and-edge-cases.spec.ts)
Covers 6 navigation and 6 edge case scenarios:
- ✓ Complete user flow from login to registration
- ✓ Responsive design validation
- ✓ Page title consistency
- ✓ Browser back/forward button functionality
- ✓ Branding and links verification
- ✓ Email with leading/trailing spaces
- ✓ Password with special characters
- ✓ Very long email addresses
- ✓ Case sensitivity in email
- ✓ Rapid form submissions
- ✓ Form state persistence

### 4. Advanced Validation Tests (advanced-validation-tests.spec.ts)
Covers 10 advanced scenarios:
- ✓ Login flow with account creation
- ✓ Multiple validation scenarios on single form
- ✓ Empty fields showing all errors
- ✓ Password requirements real-time feedback
- ✓ Field interaction sequence
- ✓ Error message clarity
- ✓ Form button disabled state during validation
- ✓ Form input trimming and normalization
- ✓ Concurrent field validation
- ✓ Cross-field validation

## Installation & Setup

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Install Playwright Browsers
```bash
npx playwright install
```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/auth/login-tests.spec.ts
```

### Run Tests in Specific Describe Block
```bash
npx playwright test --grep "Login Page Tests"
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Tests for Specific Browser
```bash
# Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit
npx playwright test --project=webkit
```

### Run Single Test
```bash
npx playwright test -g "Verify login page layout and elements"
```

## Configuration

### Playwright Configuration (playwright.config.ts)

Key configurations for this test suite:

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://eventhub.rahulshettyacademy.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
```

## Test Data

The tests use various test data scenarios:
- **Valid Email:** user@example.com, user+tag@domain.co.uk, user_name@domain.com
- **Invalid Email:** notanemail, missing@domain, invalid.email
- **Valid Password:** ValidPass@123, Password@1, etc.
- **Invalid Passwords:** weak, pass, 12345, etc.

For dynamic email testing, use:
```typescript
const uniqueEmail = `testuser${Date.now()}@example.com`;
```

## Best Practices Used

1. **Page Object Model Pattern** - All page interactions are encapsulated in POM classes
2. **Separation of Concerns** - Page objects separate locators and actions from test logic
3. **Reusable Methods** - Common operations are abstracted into helper methods
4. **Clear Naming** - Methods and variables use descriptive names
5. **Error Handling** - Tests gracefully handle timing and visibility checks
6. **Maintainability** - Locators are centralized for easy updates
7. **TypeScript** - Full type safety throughout the test suite

## Common Issues & Solutions

### Issue: Tests timeout
**Solution:** Increase timeout in playwright.config.ts:
```typescript
timeout: 30 * 1000, // 30 seconds
```

### Issue: Element not found
**Solution:** Update locators in POM classes if UI changes:
```typescript
this.emailInput = page.locator('input[placeholder="you@email.com"]');
```

### Issue: Tests fail intermittently
**Solution:** Add proper waits:
```typescript
await this.page.waitForLoadState('networkidle');
await this.page.waitForTimeout(1000);
```

## Reporting

After running tests, view the HTML report:
```bash
npx playwright show-report
```

### Allure Reports Integration

If using Allure Reports:
```bash
npm install --save-dev @playwright/test allure-playwright
npx playwright test --reporter=allure-results
allure serve allure-results
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Extending the Tests

To add new test cases:

1. **Create a new test file** in `tests/auth/`
2. **Import the POM classes:**
   ```typescript
   import { LoginPage } from '../pageObjectModel/LoginPage';
   ```
3. **Create test cases** following the same pattern:
   ```typescript
   test('Test new scenario', async ({ page }) => {
     const loginPage = new LoginPage(page);
     await loginPage.navigateTo();
     // Add test steps
   });
   ```

## Support & Documentation

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Best Practices](https://playwright.dev/docs/best-practices)

## Notes

- All tests are independent and can run in any order
- Tests use actual URLs (no mocking)
- Test data is not persisted between test runs
- Password masking is verified but actual values are stored for validation

---

**Last Updated:** September 1, 2026
**Test Coverage:** 34 test scenarios across 4 test suites

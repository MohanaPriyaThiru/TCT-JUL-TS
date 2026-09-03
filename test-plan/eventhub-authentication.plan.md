# EventHub Authentication Test Plan

## Application Overview

EventHub is a production-grade practice application for QA engineers to sharpen automation testing skills. This test plan covers the authentication flows including login and registration on the EventHub platform. The tests focus on user journey validation, form validation, error handling, and navigation between authentication pages.

## Test Scenarios

### 1. Login Page Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify login page layout and elements

**File:** `tests/auth/login-page-layout.spec.ts`

**Steps:**
  1. Navigate to https://eventhub.rahulshettyacademy.com/login
    - expect: The login page is displayed with title 'EventHub — Discover & Book Events'
    - expect: The left side shows EventHub branding with 'Rahul Shetty Academy' logo and app preview
    - expect: The right side displays 'Sign in to EventHub' heading
    - expect: Email input field with placeholder 'you@email.com' is visible
    - expect: Password input field with placeholder '••••••' is visible
    - expect: 'Sign In' button is present
    - expect: 'Register' link is visible with text 'Don't have an account? Register'
    - expect: API Documentation link is available
    - expect: Marketing content lists 4 key features on the left panel

#### 1.2. Test login with valid credentials (happy path)

**File:** `tests/auth/login-valid-credentials.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded successfully
  2. Enter a valid registered email in the email field (e.g., test@example.com)
    - expect: Email is entered in the input field
    - expect: No validation error is shown for email
  3. Enter a valid password in the password field (e.g., password123)
    - expect: Password is entered in the input field (masked with dots)
    - expect: No validation error is shown for password
  4. Click the 'Sign In' button
    - expect: User is logged in and redirected to the dashboard or home page
    - expect: OR user receives appropriate authentication success confirmation

#### 1.3. Test login with empty email and password

**File:** `tests/auth/login-empty-fields.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Leave both email and password fields empty
    - expect: Fields remain empty
  3. Click the 'Sign In' button
    - expect: Validation error 'Enter a valid email' appears below the email field
    - expect: Validation error 'Password must be at least 6 characters' appears below the password field
    - expect: User remains on the login page
    - expect: Sign In button remains active

#### 1.4. Test login with empty email only

**File:** `tests/auth/login-empty-email.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Leave email field empty and enter a password (e.g., password123)
    - expect: Password field contains the entered value
  3. Click the 'Sign In' button
    - expect: Validation error 'Enter a valid email' appears below the email field
    - expect: User remains on the login page

#### 1.5. Test login with empty password only

**File:** `tests/auth/login-empty-password.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Enter a valid email (e.g., test@example.com) and leave password field empty
    - expect: Email field contains the entered value
  3. Click the 'Sign In' button
    - expect: Validation error 'Password must be at least 6 characters' appears below the password field
    - expect: User remains on the login page

#### 1.6. Test login with invalid email format

**File:** `tests/auth/login-invalid-email-format.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Enter an invalid email format in the email field (e.g., 'notanemail' or 'missing@domain')
    - expect: Text is entered in the email field
  3. Enter a valid password in the password field
    - expect: Password is entered
  4. Click the 'Sign In' button
    - expect: Validation error 'Enter a valid email' appears below the email field
    - expect: User remains on the login page
    - expect: No API call is made

#### 1.7. Test login with password too short

**File:** `tests/auth/login-short-password.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Enter a valid email in the email field
    - expect: Email is entered
  3. Enter a password shorter than 6 characters (e.g., '12345')
    - expect: Password is entered in the field
  4. Click the 'Sign In' button
    - expect: Validation error 'Password must be at least 6 characters' appears below the password field
    - expect: User remains on the login page

#### 1.8. Test login with invalid credentials

**File:** `tests/auth/login-invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Enter a valid email format (e.g., nonexistent@example.com)
    - expect: Email is entered
  3. Enter a valid password format (e.g., password123)
    - expect: Password is entered
  4. Click the 'Sign In' button
    - expect: A toast notification appears with message 'Invalid email or password'
    - expect: User remains on the login page
    - expect: Form fields retain their values
    - expect: Notification can be dismissed by clicking the X button

#### 1.9. Test email field accepts valid formats

**File:** `tests/auth/login-email-formats.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Enter various valid email formats (e.g., user@domain.com, user+tag@domain.co.uk, user_name@domain.com)
    - expect: All valid formats are accepted without validation errors
    - expect: Email field displays the entered value
  3. Click Sign In for each email
    - expect: No client-side validation error for email format
    - expect: Server validates the credentials

#### 1.10. Test password field masks input

**File:** `tests/auth/login-password-masking.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is loaded
  2. Click on the password field and type a password (e.g., 'MyPassword123')
    - expect: Characters are displayed as dots (•••••••••••••)
    - expect: Actual password text is not visible
    - expect: Password field has placeholder '••••••'
  3. Clear the field and verify it's empty
    - expect: Field is now empty
    - expect: Placeholder text reappears

#### 1.11. Test navigation from login to registration

**File:** `tests/auth/login-to-register-navigation.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is displayed
  2. Click on the 'Register' link
    - expect: User is redirected to registration page
    - expect: URL changes to /register
    - expect: Registration form is displayed with email, password, and confirm password fields

#### 1.12. Test API Documentation link from login page

**File:** `tests/auth/login-api-documentation-link.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is displayed
  2. Click on 'API Documentation (Swagger)' link
    - expect: Link is clickable
    - expect: Link opens the Swagger API documentation
    - expect: New tab or window displays API documentation from https://api.eventhub.rahulshettyacademy.com/api/docs

#### 1.13. Test Sign In button state

**File:** `tests/auth/login-button-state.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Sign In button is visible and enabled
  2. Verify button properties with empty fields
    - expect: Sign In button is clickable
    - expect: Button text reads 'Sign In'
    - expect: Button has proper cursor indication (pointer)
  3. Fill in email and password fields and click Sign In
    - expect: Button responds to click event
    - expect: Form submission is triggered

### 2. Registration Page Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify registration page layout and elements

**File:** `tests/auth/register-page-layout.spec.ts`

**Steps:**
  1. Navigate to https://eventhub.rahulshettyacademy.com/register
    - expect: Registration page is displayed
    - expect: Page title is 'EventHub — Discover & Book Events'
    - expect: Left side shows marketing content with 'Start Practising Like a Pro QA Engineer Today' heading
    - expect: Right side displays 'Create your account' form
    - expect: Email input field is visible
    - expect: Password input field is visible with requirements list
    - expect: Confirm Password input field is visible
    - expect: 'Create Account' button is present
    - expect: 'Sign in' link is visible for existing users

#### 2.2. Test registration with valid credentials (happy path)

**File:** `tests/auth/register-valid-credentials.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Enter a valid email in the email field (e.g., newuser@example.com)
    - expect: Email is entered
    - expect: No validation error for email
  3. Enter a password that meets all requirements (e.g., 'NewPass@123'): at least 8 characters, uppercase letter, number, and special character
    - expect: Password is entered and masked
    - expect: Password checklist updates showing all requirements are met: ✓ At least 8 characters, ✓ One uppercase letter, ✓ One number, ✓ One special character
  4. Enter the same password in the Confirm Password field
    - expect: Confirm Password field contains the matching password
    - expect: No mismatch error is shown
  5. Click the 'Create Account' button
    - expect: Account is created successfully
    - expect: User is logged in and redirected to dashboard
    - expect: OR confirmation message is displayed
    - expect: User can now use the new credentials to log in

#### 2.3. Test registration with empty fields

**File:** `tests/auth/register-empty-fields.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Leave all fields empty
    - expect: All input fields are empty
  3. Click the 'Create Account' button
    - expect: Validation error 'Enter a valid email' appears for email field
    - expect: Validation error appears for password field (may vary based on requirements)
    - expect: User remains on registration page
    - expect: No account is created

#### 2.4. Test registration with invalid email format

**File:** `tests/auth/register-invalid-email.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Enter an invalid email format (e.g., 'notanemail' or 'user@')
    - expect: Text is entered in email field
  3. Enter a valid password
    - expect: Password is entered
  4. Enter the same password in Confirm Password field
    - expect: Confirm Password is filled
  5. Click 'Create Account' button
    - expect: Validation error 'Enter a valid email' appears
    - expect: User remains on registration page
    - expect: No account is created

#### 2.5. Test password does not meet minimum length requirement

**File:** `tests/auth/register-password-too-short.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Enter valid email in email field
    - expect: Email is entered
  3. Enter a password with less than 8 characters (e.g., 'Pass@1')
    - expect: Password is entered and masked
    - expect: Password requirements checklist shows: ✗ At least 8 characters (not met)
    - expect: Error message 'Password does not meet the requirements below' appears
  4. Try to click 'Create Account' button
    - expect: Button may be disabled or form validation prevents submission
    - expect: No account is created

#### 2.6. Test password without uppercase letter

**File:** `tests/auth/register-password-no-uppercase.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Enter valid email
    - expect: Email is entered
  3. Enter a password without uppercase letters (e.g., 'password123!')
    - expect: Password is entered and masked
    - expect: Password requirements checklist shows: ✗ One uppercase letter (A–Z) (not met)
    - expect: Error message 'Password does not meet the requirements below' appears
  4. Try to click 'Create Account' button
    - expect: Form validation prevents submission
    - expect: No account is created

#### 2.7. Test password without number

**File:** `tests/auth/register-password-no-number.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Enter valid email
    - expect: Email is entered
  3. Enter a password without any numbers (e.g., 'Password!')
    - expect: Password is entered and masked
    - expect: Password requirements checklist shows: ✗ One number (0–9) (not met)
    - expect: Error message 'Password does not meet the requirements below' appears
  4. Try to click 'Create Account' button
    - expect: Form validation prevents submission
    - expect: No account is created

#### 2.8. Test password without special character

**File:** `tests/auth/register-password-no-special.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Enter valid email
    - expect: Email is entered
  3. Enter a password without special characters (e.g., 'Password123')
    - expect: Password is entered and masked
    - expect: Password requirements checklist shows: ✗ One special character (!@#$%^&*…) (not met)
    - expect: Error message 'Password does not meet the requirements below' appears
  4. Try to click 'Create Account' button
    - expect: Form validation prevents submission
    - expect: No account is created

#### 2.9. Test password mismatch between password and confirm password

**File:** `tests/auth/register-password-mismatch.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
  2. Enter valid email
    - expect: Email is entered
  3. Enter a valid password (e.g., 'ValidPass@123')
    - expect: Password meets all requirements
    - expect: Requirements checklist shows all criteria met
  4. Enter a different password in Confirm Password field (e.g., 'ValidPass@124')
    - expect: Confirm Password field contains different value
  5. Click 'Create Account' button
    - expect: Error message appears indicating passwords do not match
    - expect: User remains on registration page
    - expect: No account is created

#### 2.10. Test password requirements checklist updates in real-time

**File:** `tests/auth/register-password-checklist.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is loaded
    - expect: Password requirements list is visible showing 4 requirements with ✗ marks
  2. Start typing in the password field: 'P'
    - expect: Checklist still shows unmet requirements
  3. Continue typing to 'Password@1'
    - expect: Checklist updates in real-time
    - expect: All 4 requirements show ✓ marks: At least 8 characters, One uppercase letter, One number, One special character
  4. Delete a character to 'Password'
    - expect: Number requirement changes to ✗
    - expect: Message updates to show password does not meet requirements

#### 2.11. Test navigation from registration to login

**File:** `tests/auth/register-to-login-navigation.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is displayed
  2. Click on the 'Sign in' link in the text 'Already have an account? Sign in'
    - expect: User is redirected to login page
    - expect: URL changes to /login
    - expect: Login form is displayed

#### 2.12. Test external resource links on registration page

**File:** `tests/auth/register-external-links.spec.ts`

**Steps:**
  1. Navigate to EventHub registration page
    - expect: Registration page is displayed
  2. Verify the following links are present and clickable: 'Explore all courses at RahulShettyAcademy.com', 'Explore Skill Assessments', 'API Documentation (Swagger)', 'RahulShettyAcademy.com' in footer
    - expect: All links are present and have correct href attributes
    - expect: Links point to external resources
  3. Click each link and verify it opens the correct external resource
    - expect: Each link navigates to the intended external URL

### 3. Cross-Page Navigation and UI Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. Test complete user flow from login to registration

**File:** `tests/auth/complete-flow-login-to-register.spec.ts`

**Steps:**
  1. Navigate to EventHub login page at https://eventhub.rahulshettyacademy.com/login
    - expect: Login page loads with all elements visible
  2. Click on 'Register' link
    - expect: User is directed to registration page
    - expect: URL is /register
  3. Click on 'Sign in' link on registration page
    - expect: User returns to login page
    - expect: URL is /login

#### 3.2. Test responsive design on login page

**File:** `tests/auth/login-responsive-design.spec.ts`

**Steps:**
  1. Navigate to EventHub login page
    - expect: Login page is displayed in desktop view (1920x1080)
  2. Verify all form elements are visible and properly aligned
    - expect: Email input is visible and accessible
    - expect: Password input is visible and accessible
    - expect: Sign In button is visible and clickable
    - expect: Left panel content and right panel content are properly laid out
  3. Form submission works correctly
    - expect: User can enter credentials and submit form

#### 3.3. Test page title consistency

**File:** `tests/auth/page-title-consistency.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Page title is 'EventHub — Discover & Book Events'
  2. Navigate to registration page
    - expect: Page title remains 'EventHub — Discover & Book Events'

#### 3.4. Test browser back button functionality

**File:** `tests/auth/browser-back-button.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Click 'Register' link to go to registration page
    - expect: Registration page is displayed
  3. Click browser back button
    - expect: Browser navigates back to login page
    - expect: URL is /login
    - expect: Page content is login form
  4. Click browser forward button
    - expect: Browser navigates forward to registration page
    - expect: URL is /register

#### 3.5. Test RahulShettyAcademy branding and links

**File:** `tests/auth/branding-and-links.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Rahul Shetty Academy logo (RSA) is visible on left panel
    - expect: 'Rahul Shetty Academy' text is displayed
    - expect: Logo links to external resource
  2. Navigate to registration page
    - expect: Logo and branding are consistent
    - expect: Footer contains link to RahulShettyAcademy.com
  3. Click on branding elements and footer links
    - expect: Links navigate to https://rahulshettyacademy.com

### 4. Edge Cases and Error Scenarios

**Seed:** `tests/seed.spec.ts`

#### 4.1. Test email field with leading/trailing spaces

**File:** `tests/auth/email-spaces.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is loaded
  2. Enter email with leading spaces (e.g., '  test@example.com')
    - expect: Email is entered as typed
  3. Click Sign In button
    - expect: Application either trims spaces automatically or shows validation error

#### 4.2. Test password field with special characters

**File:** `tests/auth/password-special-chars.spec.ts`

**Steps:**
  1. Navigate to registration page
    - expect: Registration page is loaded
  2. Enter a password with various special characters (e.g., 'Pass@word#123!<>')
    - expect: Password accepts all special characters
    - expect: Requirements checklist validates correctly
  3. Enter confirm password with same value
    - expect: Passwords match and form can be submitted

#### 4.3. Test form with very long email address

**File:** `tests/auth/long-email.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is loaded
  2. Enter a very long valid email (e.g., verylongemailaddress123@subdomain.example.co.uk)
    - expect: Email field accepts the long address
    - expect: No truncation occurs
  3. Enter valid password and click Sign In
    - expect: Form submission works with long email

#### 4.4. Test form with case sensitivity in email

**File:** `tests/auth/email-case-sensitivity.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is loaded
  2. Enter email in different cases (e.g., 'Test@Example.COM', 'test@example.com', 'TEST@EXAMPLE.COM')
    - expect: All variations are accepted without validation error
  3. Submit form with different case variations
    - expect: Application handles case-insensitive email matching (if username is same)

#### 4.5. Test rapid form submissions

**File:** `tests/auth/rapid-submissions.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is loaded
  2. Enter invalid credentials and click Sign In multiple times rapidly
    - expect: Application handles rapid clicks gracefully
    - expect: No duplicate submissions
    - expect: Error messages display correctly

#### 4.6. Test form state persistence on navigation

**File:** `tests/auth/form-persistence.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is loaded
  2. Enter email and password in the form
    - expect: Fields contain entered values
  3. Click Register link to navigate to registration page
    - expect: User is on registration page
  4. Click back to login page
    - expect: Form may or may not retain previous values (browser dependent)

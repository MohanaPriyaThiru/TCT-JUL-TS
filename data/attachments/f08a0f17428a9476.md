# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dataDrivenTesting.spec.ts >> data driven  rahulshettyacademy  and Learning@8
- Location: tests\dataDrivenTesting.spec.ts:9:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://rahulshettyacademy.com/loginpagePractise/", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [checked] [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1  | import { Page, Locator, expect } from "@playwright/test";
  2  | export class LoginPage {
  3  |   readonly page: Page;
  4  |   readonly username: Locator;
  5  |   password: Locator;
  6  |   checkboxTerms: Locator;
  7  |   signInbtn: Locator;
  8  |   constructor(page: Page) {
  9  |     //Page and  locators
  10 |     this.page = page;
  11 |     this.username = page.getByLabel("Username:");
  12 |     this.password = page.locator("#password");
  13 |     this.checkboxTerms = page.locator('[name="terms"]');
  14 |     this.signInbtn = page.getByRole("button", { name: "Sign In" });
  15 |   }
  16 | 
  17 |   // reusable methods
  18 |   async navigate(url: string, title: string) {
> 19 |     await this.page.goto(url);
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  20 | 
  21 |     await expect(this.page).toHaveTitle(title);
  22 |   }
  23 |   async loginMethod(UN: string, Pwd: string) {
  24 |     await this.username.fill(UN);
  25 |     await this.password.fill(Pwd);
  26 |     await this.checkboxTerms.check();
  27 |     await this.signInbtn.click();
  28 |   }
  29 |   async AssertHomePage(assertTitle: string) {
  30 |     await expect(this.page).toHaveTitle(assertTitle);
  31 |   }
  32 | }
  33 | 
```
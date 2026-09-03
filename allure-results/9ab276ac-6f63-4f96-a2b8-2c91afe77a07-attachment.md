# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API.spec.ts >> Api testing
- Location: tests\API.spec.ts:3:5

# Error details

```
TypeError: expect(received).toHaveLength(expected)

Matcher error: received value must have a length property whose value must be a number

Received has type:  number
Received has value: 1772
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("Api testing", async ({ request }) => {
  4  |   const response = await request.get(
  5  |     "https://restful-booker.herokuapp.com/booking",
  6  |   );
  7  |   console.log(response);
  8  | 
  9  |   expect(response.status()).toBe(200);
  10 |   expect(response.ok()).toBeTruthy();
  11 |   const getResponsePayload = await response.json();
  12 |   console.log(getResponsePayload);
  13 |   const arraylength = getResponsePayload.length;
  14 |   console.log(arraylength);
  15 |   expect(getResponsePayload.length).toBeGreaterThan(0);
> 16 |   expect(getResponsePayload.length).toHaveLength(1184);
     |                                     ^ TypeError: expect(received).toHaveLength(expected)
  17 | });
  18 | 
```
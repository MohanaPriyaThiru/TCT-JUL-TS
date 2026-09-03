# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API.spec.ts >> ui+api validation
- Location: tests\API.spec.ts:210:5

# Error details

```
Error: page.evaluate: Target page, context or browser has been closed
```

# Test source

```ts
  120 |     },
  121 |   });
  122 |   console.log(putResponsse);
  123 | 
  124 |   const body = await putResponsse.json();
  125 |   console.log(body);
  126 | });
  127 | 
  128 | test.describe.serial("API testing restfull booker", () => {
  129 |   let bookingid: number;
  130 |   test("post", async ({ request }) => {
  131 |     const response = await request.post("/booking", {
  132 |       headers: { "Content-Type": "application/json" },
  133 |       data: {
  134 |         firstname: "MohanaPriya",
  135 |         lastname: "Thiru",
  136 |         totalprice: 1000,
  137 |         depositpaid: true,
  138 |         bookingdates: {
  139 |           checkin: "2018-01-01",
  140 |           checkout: "2019-01-01",
  141 |         },
  142 |         additionalneeds: "Breakfast",
  143 |       },
  144 |     });
  145 | 
  146 |     console.log(response);
  147 |     const responseBody = await response.json();
  148 |     console.log(responseBody);
  149 |     bookingid = await responseBody.bookingid;
  150 |     console.log(bookingid);
  151 |   });
  152 | 
  153 |   let authToken: string;
  154 | 
  155 |   // test("auth API", async ({ request }) => {
  156 |   //   const authResponse = await request.post("/auth", {
  157 |   //     headers: { "Content-Type": "application/json" },
  158 |   //     data: {
  159 |   //       username: "admin",
  160 |   //       password: "password123",
  161 |   //     },
  162 |   //   });
  163 |   //   console.log(authResponse);
  164 |   //   const authbody = await authResponse.json();
  165 |   //   console.log(authbody);
  166 |   //   authToken = authbody.token;
  167 |   //   console.log(authToken);
  168 |   // });
  169 | 
  170 |   test("put API", async () => {
  171 |     // const apiContext = await request.newContext({
  172 |     //   httpCredentials: { username: "admin", password: "password123" },
  173 |     // });
  174 |     const putResponsse = await request.put(`/booking/${bookingid}`, {
  175 |       headers: {
  176 |         "Content-Type": "application/json",
  177 |         Accept: "application/json",
  178 |         // Cookie: `token=${authToken}`,
  179 |       },
  180 |       data: {
  181 |         firstname: "MohanaPriya",
  182 |         lastname: "T",
  183 |         totalprice: 1000,
  184 |         depositpaid: false,
  185 |         bookingdates: {
  186 |           checkin: "2018-01-01",
  187 |           checkout: "2019-01-01",
  188 |         },
  189 |         additionalneeds: "Breakfast",
  190 |       },
  191 |     });
  192 |     console.log(putResponsse);
  193 | 
  194 |     const body = await putResponsse.json();
  195 |     console.log(body);
  196 |   });
  197 | });
  198 | 
  199 | test("without using request fixture", async () => {
  200 |   const apicontext = await request.newContext({
  201 |     baseURL: "https://restful-booker.herokuapp.com",
  202 |     extraHTTPHeaders: {
  203 |       "Content-Type": "application/json",
  204 |     },
  205 |   });
  206 | 
  207 |   const response = await apicontext.get("/booking");
  208 | });
  209 | 
  210 | test("ui+api validation", async ({ page, context }) => {
  211 |   await page.goto("https://eventhub.rahulshettyacademy.com/login");
  212 |   await page.fill('[name="email"]', "trends.06208@gmail.com");
  213 |   await page.fill('[name="password"]', "Trends@06208");
  214 |   await page.click("#login-btn");
  215 |   await page.waitForURL("https://eventhub.rahulshettyacademy.com/");
  216 |   await context.storageState({ path: "auth.json" });
  217 |   await context.close();
  218 |   const authfile = "auth.json";
  219 | 
> 220 |   const token = await page.evaluate(() =>
      |                            ^ Error: page.evaluate: Target page, context or browser has been closed
  221 |     localStorage.getItem("eventhub_token"),
  222 |   );
  223 | 
  224 |   console.log("JWT Token:", token);
  225 | 
  226 |   const apicontext = await request.newContext({
  227 |     baseURL: "https://api.eventhub.rahulshettyacademy.com",
  228 |     storageState: authfile,
  229 |     extraHTTPHeaders: { "Content-Type": "application/json" },
  230 |   });
  231 | 
  232 |   const response = await apicontext.post(`/api/events`, {
  233 |     data: {
  234 |       title: "Tech Summit 2026",
  235 |       description: "A premier technology conference.",
  236 |       category: "Conference",
  237 |       venue: "Bangalore International Centre",
  238 |       city: "Bangalore",
  239 |       eventDate: "2026-06-15T09:00:00.000Z",
  240 |       price: 1500,
  241 |       totalSeats: 500,
  242 |       imageUrl: "https://example.com/banner.jpg",
  243 |     },
  244 |   });
  245 | 
  246 |   console.log(response);
  247 | });
  248 | 
```
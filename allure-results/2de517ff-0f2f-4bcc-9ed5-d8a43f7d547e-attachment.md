# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API.spec.ts >> API testing restfull booker >> put API
- Location: tests\API.spec.ts:170:7

# Error details

```
SyntaxError: Unexpected token 'F', "Forbidden" is not valid JSON
```

# Test source

```ts
  94  |     data: {
  95  |       username: "admin",
  96  |       password: "password123",
  97  |     },
  98  |   });
  99  |   console.log(authResponse);
  100 |   const authbody = await authResponse.json();
  101 |   console.log(authbody);
  102 |   const authToken = authbody.token;
  103 |   console.log(authToken);
  104 |   const putResponsse = await request.put(`/booking/${id}`, {
  105 |     headers: {
  106 |       "Content-Type": "application/json",
  107 |       Accept: "application/json",
  108 |       Cookie: `token=${authToken}`,
  109 |     },
  110 |     data: {
  111 |       firstname: "MohanaPriya",
  112 |       lastname: "T",
  113 |       totalprice: 1000,
  114 |       depositpaid: false,
  115 |       bookingdates: {
  116 |         checkin: "2018-01-01",
  117 |         checkout: "2019-01-01",
  118 |       },
  119 |       additionalneeds: "Breakfast",
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
  171 |     const apiContext = await request.newContext({
  172 |       httpCredentials: { username: "admin", password: "password123" },
  173 |     });
  174 |     const putResponsse = await apiContext.put(`/booking/${bookingid}`, {
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
> 194 |     const body = await putResponsse.json();
      |                  ^ SyntaxError: Unexpected token 'F', "Forbidden" is not valid JSON
  195 |     console.log(body);
  196 |   });
  197 | });
  198 | 
  199 | test.describe.serial("name of the group", () => {
  200 |   test("step1", () => {});
  201 |   test("step2", () => {});
  202 |   test("step3", () => {});
  203 |   test("step4", () => {});
  204 | });
  205 | 
```
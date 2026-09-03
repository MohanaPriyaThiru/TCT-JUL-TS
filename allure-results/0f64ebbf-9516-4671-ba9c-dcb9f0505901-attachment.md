# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API.spec.ts >> put
- Location: tests\API.spec.ts:72:5

# Error details

```
SyntaxError: Unexpected token 'M', "Method Not Allowed" is not valid JSON
```

# Test source

```ts
  3   | test("Api testing", async ({ request }) => {
  4   |   const response = await request.get(
  5   |     "https://restful-booker.herokuapp.com/booking",
  6   |   );
  7   |   console.log(response);
  8   | 
  9   |   expect(response.status()).toBe(200);
  10  |   expect(response.ok()).toBeTruthy();
  11  |   const getResponsePayload = await response.json();
  12  |   console.log(getResponsePayload);
  13  |   const arraylength = getResponsePayload.length;
  14  |   console.log(arraylength);
  15  |   expect(arraylength).toBeGreaterThan(0);
  16  |   expect(getResponsePayload).toHaveLength(arraylength);
  17  | });
  18  | 
  19  | let bookingid: number;
  20  | test("post", async ({ request }) => {
  21  |   const response = await request.post("/booking", {
  22  |     headers: { "Content-Type": "application/json" },
  23  |     data: {
  24  |       firstname: "MohanaPriya",
  25  |       lastname: "Thiru",
  26  |       totalprice: 1000,
  27  |       depositpaid: true,
  28  |       bookingdates: {
  29  |         checkin: "2018-01-01",
  30  |         checkout: "2019-01-01",
  31  |       },
  32  |       additionalneeds: "Breakfast",
  33  |     },
  34  |   });
  35  | 
  36  |   console.log(response);
  37  |   const responseBody = await response.json();
  38  |   console.log(responseBody);
  39  |   //   validation- status Code
  40  |   expect(response.status()).toBe(200);
  41  |   expect(response.statusText()).toBe("OK");
  42  |   expect(response.ok()).not.toBeFalsy();
  43  | 
  44  |   //validate body
  45  |   expect(responseBody.booking.firstname).toBe("MohanaPriya");
  46  |   expect(typeof responseBody.booking.firstname).toBe("string");
  47  | 
  48  |   expect(responseBody.booking.depositpaid).toBe(true);
  49  |   expect(typeof responseBody.booking.depositpaid).toBe("boolean");
  50  | 
  51  |   expect(responseBody).toHaveProperty("bookingid");
  52  |   expect(responseBody).toHaveProperty("booking");
  53  |   //   nested objected
  54  |   expect(responseBody.booking.bookingdates.checkin).toBe("2018-01-01");
  55  |   expect(responseBody.booking.bookingdates).toHaveProperty("checkin");
  56  | 
  57  |   //   idempotent/idempotency
  58  | 
  59  |   expect(responseBody.bookingid).toBeDefined();
  60  | 
  61  |   //   to store the ID
  62  | 
  63  |   bookingid = await responseBody.bookingid;
  64  |   console.log(bookingid);
  65  | 
  66  |   const getResponse = await request.get(`/booking/${bookingid}`);
  67  | 
  68  |   const getResBody = await getResponse.json();
  69  |   console.log(getResBody);
  70  | });
  71  | 
  72  | test("put", async ({ request }) => {
  73  |   const authResponse = await request.post("/auth", {
  74  |     headers: { "Content-Type": "application/json" },
  75  |     data: {
  76  |       username: "admin",
  77  |       password: "password123",
  78  |     },
  79  |   });
  80  | 
  81  |   const authbody = await authResponse.json();
  82  |   const authToken = authbody.token;
  83  | 
  84  |   const putResponsse = await request.put(`/booking/${bookingid}`, {
  85  |     headers: {
  86  |       "Content-Type": "application/json",
  87  |       Accept: "application/json",
  88  |       Cookie: `token=${authToken}`,
  89  |     },
  90  |     data: {
  91  |       firstname: "MohanaPriya",
  92  |       lastname: "T",
  93  |       totalprice: 1000,
  94  |       depositpaid: false,
  95  |       bookingdates: {
  96  |         checkin: "2018-01-01",
  97  |         checkout: "2019-01-01",
  98  |       },
  99  |       additionalneeds: "Breakfast",
  100 |     },
  101 |   });
  102 | 
> 103 |   const body = await putResponsse.json();
      |                ^ SyntaxError: Unexpected token 'M', "Method Not Allowed" is not valid JSON
  104 |   console.log(body);
  105 | });
  106 | 
```
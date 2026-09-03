import { test, expect, request } from "@playwright/test";

test("Api testing", async ({ request }) => {
  const response = await request.get(
    "https://restful-booker.herokuapp.com/booking",
  );
  console.log(response);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  const getResponsePayload = await response.json();
  console.log(getResponsePayload);
  const arraylength = getResponsePayload.length;
  console.log(arraylength);
  expect(arraylength).toBeGreaterThan(0);
  expect(getResponsePayload).toHaveLength(arraylength);
});

let bookingid: number;
test("post", async ({ request }) => {
  const response = await request.post("/booking", {
    headers: { "Content-Type": "application/json" },
    data: {
      firstname: "MohanaPriya",
      lastname: "Thiru",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
  });

  console.log(response);
  const responseBody = await response.json();
  console.log(responseBody);
  //   validation- status Code
  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe("OK");
  expect(response.ok()).not.toBeFalsy();

  //validate body
  expect(responseBody.booking.firstname).toBe("MohanaPriya");
  expect(typeof responseBody.booking.firstname).toBe("string");

  expect(responseBody.booking.depositpaid).toBe(true);
  expect(typeof responseBody.booking.depositpaid).toBe("boolean");

  expect(responseBody).toHaveProperty("bookingid");
  expect(responseBody).toHaveProperty("booking");
  //   nested objected
  expect(responseBody.booking.bookingdates.checkin).toBe("2018-01-01");
  expect(responseBody.booking.bookingdates).toHaveProperty("checkin");

  //   idempotent/idempotency

  expect(responseBody.bookingid).toBeDefined();

  //   to store the ID

  bookingid = await responseBody.bookingid;
  console.log(bookingid);

  const getResponse = await request.get(`/booking/${bookingid}`);

  const getResBody = await getResponse.json();
  console.log(getResBody);
});

test("put", async ({ request }) => {
  const response = await request.post("/booking", {
    headers: { "Content-Type": "application/json" },
    data: {
      firstname: "MohanaPriya",
      lastname: "Thiru",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
  });

  const postbody = await response.json();

  const id = postbody.bookingid;

  const authResponse = await request.post("/auth", {
    headers: { "Content-Type": "application/json" },
    data: {
      username: "admin",
      password: "password123",
    },
  });
  console.log(authResponse);
  const authbody = await authResponse.json();
  console.log(authbody);
  const authToken = authbody.token;
  console.log(authToken);
  const putResponsse = await request.put(`/booking/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${authToken}`,
    },
    data: {
      firstname: "MohanaPriya",
      lastname: "T",
      totalprice: 1000,
      depositpaid: false,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
  });
  console.log(putResponsse);

  const body = await putResponsse.json();
  console.log(body);
});

test.describe.serial("API testing restfull booker", () => {
  let bookingid: number;
  test("post", async ({ request }) => {
    const response = await request.post("/booking", {
      headers: { "Content-Type": "application/json" },
      data: {
        firstname: "MohanaPriya",
        lastname: "Thiru",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    });

    console.log(response);
    const responseBody = await response.json();
    console.log(responseBody);
    bookingid = await responseBody.bookingid;
    console.log(bookingid);
  });

  let authToken: string;

  test("auth API", async ({ request }) => {
    const authResponse = await request.post("/auth", {
      headers: { "Content-Type": "application/json" },
      data: {
        username: "admin",
        password: "password123",
      },
    });
    console.log(authResponse);
    const authbody = await authResponse.json();
    console.log(authbody);
    authToken = authbody.token;
    console.log(authToken);
  });

  test("put API", async ({request}) => {
    
    const putResponsse = await request.put(`/booking/${bookingid}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
         Cookie: `token=${authToken}`,
      },
      data: {
        firstname: "MohanaPriya",
        lastname: "T",
        totalprice: 1000,
        depositpaid: false,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    });
    console.log(putResponsse);

    const body = await putResponsse.json();
    console.log(body);
  });
});

test("without using request fixture", async () => {
  const apicontext = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  });

  const response = await apicontext.get("/booking");
});

test("ui+api validation", async ({ page, context }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.fill('[name="email"]', "trends.06208@gmail.com");
  await page.fill('[name="password"]', "Trends@06208");
  await page.click("#login-btn");
  await page.waitForURL("https://eventhub.rahulshettyacademy.com/");
  await context.storageState({ path: "auth.json" });

  const authfile = "auth.json";

  // const token = await page.evaluate(() => localStorage.getItem("value"));

  const token = await page.localStorage.getItem("eventhub_token");
  console.log("JWT Token:", token);
  await context.close();
  const apicontext = await request.newContext({
    baseURL: "https://api.eventhub.rahulshettyacademy.com",
    storageState: authfile,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await apicontext.post(`/api/events`, {
    headers: { accept: "application/json" },
    data: {
      title: "Tech Summit",
      description: "A  technology conference.",
      category: "Conference",
      venue: "Bangalore International Centre",
      city: "Banglore",
      eventDate: "2026-09-15T09:00:00.000Z",
      price: 1500,
      totalSeats: 500,
      imageUrl: "https://example.com/banner.jpg",
    },
  });

  console.log(response);
  const body = await response.json();

  console.log(body);
});

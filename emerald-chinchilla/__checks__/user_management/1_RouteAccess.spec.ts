import { Page, test } from "@playwright/test";
import SessionUtils from "../../Utilities/SessionUtils";

const column_order = [
  "address",
  "bio",
  "email",
  "jobTitle",
  "name",
  "select",
  "status",
  "zodiacSign",
];

let page: Page;

test.beforeEach("", async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://app-cotton-cloud-app-dev.azurewebsites.net/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await SessionUtils.MicrosoftLogIn(page);
});

test.describe("Route Access Test", async () => {
  test("'/users' accessible only with authentication", async () => {
    console.log("Test in development");
  });
});

test.afterAll("", async () => {
  // await page.close();
});

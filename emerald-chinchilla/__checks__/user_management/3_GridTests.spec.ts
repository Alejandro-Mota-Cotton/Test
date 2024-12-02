import { Page, test } from "@playwright/test";
import SessionUtils from "../../Utilities/SessionUtils";

let page: Page;

test.beforeEach("", async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://app-cotton-cloud-app-dev.azurewebsites.net/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await SessionUtils.MicrosoftLogIn(page);
});

test.describe("Data grid", async () => {
  test("blank test", async () => {
    console.log("Test in development");
  });
});

test.afterAll("", async () => {
  // await page.close();
});

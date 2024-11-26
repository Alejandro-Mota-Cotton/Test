import { expect, test } from "@playwright/test";
import SessionUtils from "../../Utilities/SessionUtils";

//This test evaluates if the login with microsoft service is working
test("Login test", async ({ page }) => {
  await page.goto(process.env.ENVIRONMENT_URL);
  // await page.getByText("Login with Office").click();
  await page.getByRole("button", { name: "Sign in" }).click();
  await SessionUtils.MicrosoftLogIn(page);
  await expect(
    page.getByRole("button", { name: "Cotton App Test" })
  ).toBeVisible();
});

import { Page } from "@playwright/test";
const USER = {
  mail: "",
  password: "",
};

class SessionUtils {
  static async MicrosoftLogIn(page: Page): Promise<void> {
    await page
      .getByPlaceholder("First.Last@cottonteam.com")
      .fill("cottonapptest@cottonteam.com");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByPlaceholder("Password").fill("i@Xu24#zJsK");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("button", { name: "No" }).click();
  }
}

export default SessionUtils;

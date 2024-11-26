import { expect, Page, test } from "@playwright/test";
import SessionUtils from "../../Utilities/SessionUtils";

let page: Page;

test.beforeAll("", async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(`${process.env.ENVIRONMENT_URL}`);
  await page.getByRole("button", { name: "Sign in" }).click();
  await SessionUtils.MicrosoftLogIn(page);
});

test.beforeEach(async () => {
  await page.goto(`${process.env.ENVIRONMENT_URL}/playground/inputs`);
});

test.describe("Input Fields", async () => {
  test("Text input field", async ({}) => {
    let value;
    //Evaluating if the input is selectable by role
    await expect(
      page.getByRole("textbox", { name: "text" }).nth(0)
    ).toBeAttached();
    //Evaluating if the devault valie is '1234'
    await expect(
      page.getByRole("textbox", { name: "text" }).nth(0)
    ).toHaveValue("1234");
    //Evaluating if the value can be modified with the locator's function
    await page.getByRole("textbox", { name: "text" }).nth(0).clear();
    await expect(
      page.getByRole("textbox", { name: "text" }).nth(0)
    ).toHaveValue("");
    await page.getByRole("textbox", { name: "text" }).nth(0).fill("4321");
    await expect(
      page.getByRole("textbox", { name: "text" }).nth(0)
    ).toHaveValue("4321");
  });

  test("Required and disabled", async ({}) => {
    let value;
    //Evaluating if the input is selectable by role
    await expect(
      page.getByPlaceholder("Fill in this field").nth(1)
    ).toBeAttached();
    //Evaluating if the devault value is 'Fill in this field'
    await expect(
      page.getByPlaceholder("Fill in this field").nth(1)
    ).toHaveValue("");
    //Evaluating if the field is disables
    await expect(
      page.getByPlaceholder("Fill in this field").nth(1)
    ).toBeDisabled();
  });

  test("Text area input", async ({}) => {
    let value;
    //Evaluating if the input is selectable by role
    await expect(
      page.getByRole("textbox", { name: "text" }).nth(1)
    ).toBeAttached();
    //Evaluating if the devault valie is ''
    await expect(
      page.getByRole("textbox", { name: "text" }).nth(1)
    ).toHaveValue("");
    //Evaluating if the value can be modified with the locator's function
    await page.getByRole("textbox", { name: "text" }).nth(1).fill("4321");
    await expect(
      page.getByRole("textbox", { name: "text" }).nth(1)
    ).toHaveValue("4321");
  });

  test("Number input", async ({}) => {
    let value;
    //Evaluating if the input is selectable by role
    await expect(page.locator('[id="\\:re\\:-form-item"]')).toBeAttached();
    //Evaluating if the devault valie is ''
    await expect(page.locator('[id="\\:re\\:-form-item"]')).toHaveValue("");
    //Evaluating if the value can be modified with the locator's function
    await page.locator('[id="\\:re\\:-form-item"]').fill("4321");
    await expect(page.locator('[id="\\:re\\:-form-item"]')).toHaveValue("4321");
    //evaluating string input
    await page.locator('[id="\\:re\\:-form-item"]').clear();
    // await page.getByLabel('Number Input*').fill('String');
    await expect(page.locator('[id="\\:re\\:-form-item"]')).toHaveJSProperty(
      "type",
      "number"
    );
  });

  test("Date input", async ({}) => {
    let value;
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today
      .getDate()
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    const day = today.getDate();

    //Evaluating if the input is selectable by role
    await expect(page.getByLabel("Date Input*")).toBeAttached();
    //Evaluating if the devault value is ''
    await expect(
      page.getByRole("button", { name: "Date" }).nth(0)
    ).toContainText("Pick a date");
    //Evaluating if the value can be modified with the locator's function
    await page.getByRole("button", { name: "Date" }).nth(0).click();
    await page
      .getByText(day.toString().padStart(2, "0"), { exact: true }) // getByRole("gridcell", { name: day.toString().padStart(2, "0") })
      .click();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Date" }).nth(0)
    ).toContainText(formattedDate);
  });

  test("Disabled and default value date input", async ({}) => {
    let value;
    const today = new Date();

    const formattedDate = `${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today
      .getDate()
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    //Evaluating if the input is selectable by role
    await expect(
      page.getByLabel("Disabled and default value Date Input")
    ).toBeAttached();
    //Evaluating if the devault value is ''
    await expect(
      page.getByRole("button", { name: "Date" }).nth(1)
    ).toContainText(formattedDate);
    //Evaluating if the button is not clickable
    await expect(
      page.getByRole("button", { name: "Date" }).nth(1)
    ).not.toBeEnabled();
  });

  test("Select input", async ({}) => {
    let value;
    //Evaluating if the input is selectable by role
    await expect(
      page.getByLabel("Select Input*", { exact: true })
    ).toBeAttached();
    //Evaluating if the devault value is ''
    await expect(
      page.getByLabel("Select Input*", { exact: true })
    ).toContainText("Select...");
    //Evaluating if the value can be modified
    await page.getByLabel("Select Input*", { exact: true }).click();
    await page.getByRole("option", { name: "Option 1", exact: true }).click();
    await expect(
      page.getByLabel("Select Input*", { exact: true })
    ).toContainText("Option 1");
    await page.getByRole("option", { name: "Option 4", exact: true }).click();
    await expect(
      page.getByLabel("Select Input*", { exact: true })
    ).toContainText("Option 4");
    await page.keyboard.press("Escape");
  });

  test("Multi Select input", async ({}) => {
    let value;
    //Evaluating if the input is selectable by role
    await expect(
      page.getByLabel("Multi Select Input*", { exact: true })
    ).toBeAttached();
    //Evaluating if the devault value is ''
    await expect(
      page.getByLabel("Multi Select Input*", { exact: true })
    ).toContainText("Select...");
    //Evaluating if the value can be modified
    await page.getByLabel("Multi Select Input*", { exact: true }).click();
    await page.getByRole("option", { name: "Option 1", exact: true }).click();
    await expect(
      page.getByLabel("Multi Select Input*", { exact: true })
    ).toContainText("Option 1");
    await page.getByRole("option", { name: "Option 4", exact: true }).click();
    await expect(
      page.getByLabel("Multi Select Input*", { exact: true })
    ).toContainText("Option 1Option 4");
    await page.keyboard.press("Escape");
  });
});

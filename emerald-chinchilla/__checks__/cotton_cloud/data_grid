import { expect, Page, test } from "@playwright/test";
import SessionUtils from "../../Utilities/SessionUtils";
import { grid_data } from "../../Utilities/Utilities";

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

test.describe("Data grid", async () => {
  test("playground/table route enabled", async ({}) => {
    //navigating to table grid through side bar
    await page.getByRole("link", { name: "Playground" }).click();
    await page.getByRole("link", { name: "Data Tables" }).click();
    //Validate url
    await expect(page).toHaveURL(/\/playground\/tables$/);
  });
  test("Global search", async ({}) => {
    //navigating to table grid through side bar
    await page.getByRole("link", { name: "Playground" }).click();
    await page.getByRole("link", { name: "Data Tables" }).click();
    //Validate global search is working --start
    //Searching with email
    await page.getByPlaceholder("Search...", { exact: true }).clear();
    await page
      .getByPlaceholder("Search...", { exact: true })
      .fill(grid_data[5].zodiacSign);
    //evaluating if the search returns the expected lines
    await page.waitForTimeout(1000);
    await page.locator("td").first().click();
    await page.keyboard.press("ArrowRight", { delay: 3000 });
    await expect(
      // await page.getByRole("cell", { name: grid_data[5].zodiacSign }).all()
      (
        await page.locator("tr").getByText(grid_data[5].zodiacSign).all()
      ).length
    ).toBeGreaterThan(1);
  });
  test("Filtering", async () => {
    await test.setTimeout(1.5 * 60 * 1000);
    //navigating to table grid through side bar
    await page.getByRole("link", { name: "Playground" }).click();
    await page.getByRole("link", { name: "Data Tables" }).click();
    //Evaluating if no filter is applied at first load
    await page.getByLabel("Open filters", { exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "No filters applied", exact: true })
    ).toBeVisible();
    //Adding one filter
    await page.getByRole("button", { name: "Add filter", exact: true }).click();
    await expect(page.getByText("Where")).toBeVisible();
    await page.getByLabel("Select filter field", { exact: true }).click();
    await page
      .getByRole("option", { name: "Zodiac Sign", exact: true })
      .click();
    await page.getByLabel("Zodiac Sign filter values").click();
    await page.getByRole("option", { name: grid_data[5].zodiacSign }).click();
    await page.keyboard.press("Escape");
    expect(
      (await page.getByRole("cell", { name: grid_data[5].zodiacSign }).all())
        .length
    ).toBeGreaterThan(20);
    //Adding a second filter to the already filtered grid
    await page.getByLabel("Open filters").dblclick();
    await page.getByRole("button", { name: "Add filter", exact: true }).click();
    await expect(page.getByLabel("Select join operator")).toBeVisible();
    await page.getByLabel("Select filter field").nth(1).click();
    await page.getByRole("option", { name: "Status", exact: true }).click();
    await page.getByLabel("Status filter values").click();
    await page.getByRole("option", { name: "active", exact: true }).click();
    await page.waitForTimeout(300);
    await page.keyboard.press("Escape");
    expect(
      (await page.getByRole("cell", { name: grid_data[5].status }).all()).length
    ).toBeGreaterThan(1);
    //Removing all filters
    await page.getByLabel("Open filters", { exact: true }).dblclick();
    await page.getByRole("button", { name: "remove" }).nth(1).click();
    await page.getByRole("button", { name: "Reset filters" }).click();
    await page.keyboard.press("Escape");
    await expect(
      (
        await page.getByRole("cell", { name: "inactive" }).all()
      ).length
    ).toBeGreaterThan(1);
  });
  test.describe("Column toggle, sort and resize", () => {
    test.setTimeout(1.5 * 60 * 1000);
    test("Column toggle", async ({}) => {
      //navigating to table grid through side bar
      await page.getByRole("link", { name: "Playground" }).click();
      await page.getByRole("link", { name: "Data Tables" }).click();
      //Validate column toggle (disabling all columns but select and actions)
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Status" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Email" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Address" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Bio" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Job Title" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Zodiac Sign" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Name" }).click();
      //evaluating if columns are hidden
      await expect(page.getByRole("cell").getByText("Name")).not.toBeVisible();
      await expect(
        page.getByRole("cell").getByText("Address")
      ).not.toBeVisible();
      await expect(page.getByRole("cell").getByText("Bio")).not.toBeVisible();
      await expect(
        page.getByRole("cell").getByText("Job Title")
      ).not.toBeVisible();
      await expect(
        page.getByRole("cell").getByText("Zodiac Sign")
      ).not.toBeVisible();

      //Validate column toggle (enabling all columns)
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Status" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Email" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Address" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Bio" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Job Title" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Zodiac Sign" }).click();
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      await page.getByRole("menuitemcheckbox", { name: "Name" }).click();
      //validaing if all columns are visible
      await expect(page.getByRole("cell").getByText("Name")).toBeVisible();
      await expect(page.getByRole("cell").getByText("Address")).toBeVisible();
      await expect(page.getByRole("cell").getByText("Bio")).toBeVisible();
      await expect(page.getByRole("cell").getByText("Job Title")).toBeVisible();
      await expect(
        page.getByRole("cell").getByText("Zodiac Sign")
      ).toBeVisible();
    });
    test("Column sort", async ({}) => {
      //navigating to table grid through side bar
      await page.getByRole("link", { name: "Playground" }).click();
      await page.getByRole("link", { name: "Data Tables" }).click();
      //Validate column toggle (disabling all columns but select and actions)
      await page.getByRole("button", { name: "Columns", exact: true }).click();
      //Sorting columns --start
      for (let column of column_order) {
        const col_name = await page
          .locator("#" + column)
          .getByRole("button")
          .boundingBox();
        const col_name_2 = await page
          .getByLabel("columns")
          .getByRole("button")
          .last()
          .boundingBox();
        if (col_name && col_name_2) {
          await page.mouse.move(
            col_name.x + col_name.width / 2,
            col_name.y + col_name.height / 2
          );
          await page.mouse.down();

          // Move to a position just below the target element
          await page.mouse.move(
            col_name_2.x + col_name_2.width / 2,
            col_name_2.y + col_name_2.height + 5 // Adding 5 pixels below the target box
          );

          // Drop
          await page.mouse.up();
        }
      }
      //sorting columns --end
      const ordered_columns = await page
        .getByLabel("columns")
        .getByRole("menuitemcheckbox")
        .allInnerTexts();

      // Convert both arrays to lowercase for comparison
      const ordered_columns_lower = ordered_columns.map((col) =>
        col.toLowerCase().replace(/\s+/g, "")
      );
      const column_order_lower = column_order.map((col) => col.toLowerCase());
      // Compare the arrays
      await expect(ordered_columns_lower).toEqual(column_order_lower);
    });
    // test("Column resize", async ({}) => {
    //   let divider;
    //   let cell_box;
    //   let new_cell_box;
    //   //navigating to table grid through side bar
    //   await page.getByRole("link", { name: "Playground" }).click();
    //   await page.getByRole("link", { name: "Data Tables" }).click();
    //   //Evaluating resize to bigger --start
    //   divider = await page
    //     .getByRole("cell", { name: "Select all" })
    //     .locator("div")
    //     .first()
    //     .boundingBox();
    //   cell_box = await page
    //     .getByRole("cell", { name: "Select all" })
    //     .boundingBox();
    //   await page.mouse.move(
    //     divider.x + divider.width / 2,
    //     divider.y + divider.height / 2
    //   );
    //   await page.mouse.down({ button: "left" });
    //   await page.mouse.move(
    //     cell_box.x + cell_box.width + 800,
    //     cell_box.y + cell_box.height / 2
    //   );
    //   await page.mouse.up({ button: "left" });
    //   new_cell_box = await page
    //     .getByRole("cell", { name: "Select all" })
    //     .boundingBox();
    //   expect(new_cell_box.width).toBeGreaterThan(cell_box.width);
    //   //Evaluating resize to bigger --end

    //   //Evaluating resize to smaller --start
    //   divider = await page
    //     .getByRole("cell", { name: "Select all" })
    //     .locator("div")
    //     .boundingBox();
    //   cell_box = await page
    //     .getByRole("cell", { name: "Select all" })
    //     .boundingBox();
    //   await page.mouse.move(
    //     divider.x + divider.width / 2,
    //     divider.y + divider.height / 2
    //   );
    //   await page.mouse.down();
    //   await page.mouse.move(
    //     cell_box.x + cell_box.width - 70,
    //     cell_box.y + cell_box.height / 2
    //   );
    //   await page.mouse.up();
    //   new_cell_box = await page
    //     .getByRole("cell", { name: "Select all" })
    //     .boundingBox();
    //   expect(new_cell_box.width).toBeLessThan(cell_box.width);
    //   //Evaluating resize to smaller --end
    // });
  });
  test("Table reset", async ({}) => {
    test.setTimeout(1.5 * 60 * 1000);
    //navigating to table grid through side bar
    await page.getByRole("link", { name: "Playground" }).click();
    await page.getByRole("link", { name: "Data Tables" }).click();
    //adding filter as prerequisite for the test
    // await GridUtils.addFilter("Zodiac Sign", grid_data[5].zodiacSign, page);
    await page.getByLabel("Open filters", { exact: true }).click();
    await page.getByRole("button", { name: "Add filter", exact: true }).click();
    await expect(page.getByText("Where")).toBeVisible();
    await page.getByLabel("Select filter field", { exact: true }).click();
    await page
      .getByRole("option", { name: "Zodiac Sign", exact: true })
      .click();
    await page.getByLabel("Zodiac Sign filter values").click();
    await page.getByRole("option", { name: grid_data[5].zodiacSign }).click();
    await page.keyboard.press("Escape");
    await expect(
      (
        await page.getByRole("cell", { name: grid_data[5].zodiacSign }).all()
      ).length
    ).toBeGreaterThan(20);
    //Resetting grid
    await page.getByRole("button", { name: "reset" }).click();
  });
  // test("Table refresh", async ({}) => {
  //   //navigating to table grid through side bar
  //   await page.getByRole("link", { name: "Playground" }).click();
  //   await page.getByRole("link", { name: "Data Tables" }).click();
  //   //Resetting grid
  //   await page.getByRole("button", { name: "refresh" }).click();
  // });
  // test("Download CSV", async ({}) => {
  //   await page.getByRole("button", { name: "Download" }).click();

  //   const download = await page.waitForEvent("download");
  //   const fileName = download.suggestedFilename();
  //   console.log(`Download started: ${fileName}`);

  //   await download.saveAs(`../Downloads/${fileName}`);

  //   const fs = require("fs");
  //   expect(fs.existsSync(`../Downloads/${fileName}`)).toBe(true);
  // });
});

test.afterAll("", async () => {
  // await page.close();
});

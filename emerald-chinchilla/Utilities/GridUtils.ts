import { expect, Page } from "@playwright/test";

class GridUtils {
  static async addFilter(filter: string, filterValue: string, page: Page) {
    //Adding one filter
    await page.getByLabel("Open filters", { exact: true }).click();
    await page.getByRole("button", { name: "Add filter", exact: true }).click();
    await expect(page.getByText("Where")).toBeVisible();
    await page.getByLabel("Select filter field", { exact: true }).click();
    await page.getByRole("option", { name: filter, exact: true }).click();
    await page.getByPlaceholder("Enter a value...").fill(filterValue);
    await page.keyboard.press("Escape");
  }
}

export default GridUtils;

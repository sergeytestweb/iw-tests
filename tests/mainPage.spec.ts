import { test, expect } from "@playwright/test";
import { before, beforeEach } from "node:test";

test.describe("Tests of the Main page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://innowise.com/");
  });

  test("has SVG", async ({ page }) => {
    // Check for SVG elements on the page
    const svgElements = await page.locator("svg").count();
    expect(svgElements).toBeGreaterThan(0);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Innowise ® | Software development company/);
  });

  test("check Contact us botton", async ({ page }) => {
    // Click on Contact us.
    await page.getByRole("link", { name: "Contact us" }).click();

    // Expects page to have a heading with the name of Contact us.
    await expect
      .soft(page.getByRole("heading", { name: "Contact us" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("heading", { name: "Contact us" }))
      .toContainText("Contact us");
    await expect
      .soft(page.getByRole("link", { name: "Contact us" }).first())
      .toHaveAttribute("href", "/contact-us/");
  });

  test("Check of the header elements", async ({ page }) => {
    await expect(page.getByRole("img").first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: "About us" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Services" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Technologies" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "All services" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Industries we serve" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Technological domains" })
    ).toBeVisible();
    await expect(page.getByText("TechnologiesAll technologies")).toBeVisible();
  });

  test("Check of the names of the header elements", async ({ page }) => {
    await expect(page.locator("body")).toContainText("About us");
    await page.getByRole("link", { name: "Services" }).first().click();
    await expect(page.locator("h1")).toContainText(
      "IT solution services offered by Innowise"
    );
    await expect(page.locator("body")).toContainText("IT support");
  });

  test("Check of the href attributes of the header elements", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: "About us" }).first()
    ).toHaveAttribute("href", "/about-us/");
    await expect(
      page.getByRole("link", { name: "Services" }).first()
    ).toHaveAttribute("href", "/services/");
  });
});

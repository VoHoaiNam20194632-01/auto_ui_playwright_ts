import { test, expect, Page } from "@playwright/test";
let listButton = [
  "Div button",
  "Origin button",
  "Input button",
  "Default",
  "Primarys",
  "Dashed",
  "Text",
  "Link",
  "Icon button",
];

for (let buttonText of listButton) {
  test(`Verify button ${buttonText}`, async ({ page }) => {
    await page.goto(
      "https://test-with-me-app.vercel.app/learning/web-elements/elements/button"
    );
    // Click on button
    await clickButtonByLabel(buttonText, page);
    // Verify text
    await expect(
      page.getByText(`Button ${buttonText} was clicked!`)
    ).toBeVisible();
  });
}

function clickButtonByLabel(label: string, page: Page) {
  //div[normalize-space(.)="Div button"] | //button[normalize-space(.)="Div button"] | //input[normalize-space(.)="Div button"]
  let divButtonXpath = `//div[normalize-space(.)="${label}"]`;
  let inputButtonXpath = `//input[normalize-space(@value)="${label}"]`;
  let buttonXpath = `//button[normalize-space(.)="${label}"]`;
  page
    .locator(`${divButtonXpath} | ${inputButtonXpath} | ${buttonXpath}`)
    .click();
}

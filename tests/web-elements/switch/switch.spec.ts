import { test, expect, Page } from "@playwright/test";

    test(`Verify switch `, async ({ page }) => {
        // Go to page checkbox
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/components/switch");
        
        await selectCheckboxByLabel('Switch',true,page);
        // await
        await expect(page.getByText(`Current Value: true`))
            .toBeVisible();
        await selectCheckboxByLabel('Switch',false,page);
        // await
        await expect(page.getByText(`Current Value: false`))
            .toBeVisible();
    })


async function selectCheckboxByLabel(label: string, check : boolean, page: Page) {
    let xpathSwitch = `(//div[normalize-space()="${label}"]/following::button[@role="switch"])[1]`
    // check Switch checked
    let checkChecked = await page.locator(xpathSwitch).getAttribute("aria-checked");
    // click Switch
    if ((!checkChecked && check) || (checkChecked && !check)) {
        await page.locator(xpathSwitch).click();
    }
}




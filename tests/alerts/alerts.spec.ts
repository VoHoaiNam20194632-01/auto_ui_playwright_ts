import{test,Page, expect} from "@playwright/test"


test(`Verify Alets `, async({page})=>{
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/alerts")
    page.on('dialog', dialog => {
        dialog.accept();
    })
    clickButtonByLabel('Show Alert', page);
    await page.waitForTimeout(1000);

});

async function clickButtonByLabel(label:string, page:Page) {
    let buttonXpath = `//button[normalize-space()="${label}"]`;
    await page.locator(buttonXpath).click();
}

test(`Verify Alert with prompt box `, async({page})=>{
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/alerts")
    page.on('dialog', dialog => {
        dialog.accept('Vo Hoai Nam');
    })
    clickButtonByLabel('Show Prompt', page);
    await expect(page.getByText('Entered value: Vo Hoai Nam')).toBeVisible();

});
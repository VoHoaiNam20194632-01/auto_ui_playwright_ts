import{test,Page, expect} from "@playwright/test"


test(`Verify From in Shadow DOM `, async({page})=>{
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom")
    let myShadowRoot = page.locator('#my-shadow');
    await myShadowRoot.locator('#name-input').fill('Vo Hoai Nam');
    await myShadowRoot.locator('#shadow-btn').click();
    await expect(myShadowRoot.getByText('What you just type: Vo Hoai Nam')).toBeVisible();
});

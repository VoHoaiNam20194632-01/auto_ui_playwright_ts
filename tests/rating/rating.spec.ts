import { test, expect, Page } from "@playwright/test";
import { ratingData } from "./rating-data";
for(let data of ratingData){
test(`Auto select rating ${data.ratingNumber} `, async ({ page }) => {
    await page.goto(
        "https://test-with-me-app.vercel.app/learning/web-elements/components/rating"
    );
    // Click on button
    await selectRatingByLabel('Rate',data.ratingNumber,page)
    // Verify text
    await expect(
        page.getByText(`Current rating: ${data.ratingText}`)
    ).toBeVisible();
});
}
async function selectRatingByLabel(label:string, rating: number,page:Page){
    let ratingGroupXpath = `(//div[normalize-space()="${label}"]/following::ul[@role="radiogroup"])[1]`
    let ratingGroupLocator = page.locator(ratingGroupXpath);
    let currentRating = (await ratingGroupLocator.locator(`//div[@aria-checked="true"]`).all()).length;
    if(currentRating != rating){
    let xpath =`//li[${rating}]//div[@role="radio"]`;
    await ratingGroupLocator.locator(xpath).click();
    }
}

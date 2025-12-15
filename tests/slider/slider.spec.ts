import{test,Page, expect} from "@playwright/test"


test(`Verify Slider `, async({page})=>{
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/components/slider")
    await slideToValueOnSliderByLabel(100,'Slider',page)
    expect(page.getByText("Current Value: 100").first()).toBeVisible();
})

async function slideToValueOnSliderByLabel(input:number, label:string, page:Page) {
    let sliderXpath = `(//div[normalize-space()="Slider"]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-slider-rail ')])[1]`;
    let sliderLocator = page.locator(sliderXpath);
    let sliderBox = await sliderLocator.boundingBox();
    let x = sliderBox?.x ?? 0;
    let y = sliderBox?.y ?? 0;
    let width = sliderBox?.width ?? 0;
    let height = sliderBox?.height ?? 0;
    let beClickedX = width /100 * input  + x;
    let beClickedY = y + height /2;
    await page.mouse.click(beClickedX, beClickedY);
}
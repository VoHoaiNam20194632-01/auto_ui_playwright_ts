import{test,Page, expect} from "@playwright/test"
let textDropdowns =["1st menu item","2nd menu item","3rd menu item","4rd menu item"]
for(let textDropdown of textDropdowns){
test(`Verify Dropdown ${textDropdown}`, async({page})=>{
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/dropdown")
    let xpathDropdown = "//button[contains(concat(' ',normalize-space(@class),' '),' ant-dropdown-trigger ')]";
    await page.locator(xpathDropdown).hover();
    let xpathItemDropdown = `//li[.//span[normalize-space(text())='${textDropdown}']]`
    await page.locator(xpathItemDropdown).click();
    let xpathValueButton = `//button[.//span[normalize-space(text())="${textDropdown}"]]`
    expect(page.getByText(`Value: ${textDropdown}`)).toBeVisible();
    expect(page.locator(xpathValueButton)).toBeVisible();
})}
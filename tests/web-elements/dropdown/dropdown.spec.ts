import{test,Page, expect} from "@playwright/test"
let textDropdowns =["1st menu item","2nd menu item","3rd menu item","4rd menu item"]
for(let textDropdown of textDropdowns){
test(`Verify Dropdown ${textDropdown}`, async({page})=>{
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/dropdown")
    await selectDropdownByLabel('Dropdown',textDropdown,page);
    let xpathValueButton = `//button[.//span[normalize-space(text())="${textDropdown}"]]`
    expect(page.getByText(`Value: ${textDropdown}`)).toBeVisible();
    expect(page.locator(xpathValueButton)).toBeVisible();
})}

async function selectDropdownByLabel(label:string,option:string,page:Page){
    //div[normalize-space()="Dropdown"]/following-sibling::div//button[contains(concat(' ',normalize-space(@class),' '),' ant-dropdown-trigger ')]
    let openDropdownXpath=`//div[normalize-space()="${label}"]/following::button[contains(concat(' ',normalize-space(@class),' '),' ant-dropdown-trigger ')][1]`;
    await page.locator(openDropdownXpath).hover();
    let dropdownOptionXpath =`//li[normalize-space(.)='${option}']`;
    await page.locator(dropdownOptionXpath).click();
}
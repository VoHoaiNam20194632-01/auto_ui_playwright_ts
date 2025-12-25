import { test, expect, Page } from "@playwright/test";
import { expectedTableData } from "./table-test-data";

test(`Verify table`, async ({ page }) => {
    await page.goto(
        "https://test-with-me-app.vercel.app/learning/web-elements/components/table");
    let tableData = await getDataTableByTableName('Table', page);
    console.log("data Table:", JSON.stringify(tableData, null, 2));
    expect(tableData).toEqual(expect.arrayContaining(expectedTableData));
    expect(expectedTableData).toEqual(expect.arrayContaining(tableData));
});

async function getDataTableByTableName(nameTable:string, page:Page) {
    let tableXpath =`(//div[.//span[normalize-space(text())="${nameTable}"] and @role="separator"]/following::table)[1]`
    let tableLocator = page.locator(tableXpath);
    let headerXpath = `//thead//tr//th[contains(concat(' ',normalize-space(@class),' '),' ant-table-cell ')]`;
    let actualHeaders = await tableLocator.locator(headerXpath).allTextContents();

    let nameIndex = actualHeaders.indexOf('Name');
    let ageIndex = actualHeaders.indexOf('Age');
    let addressIndex = actualHeaders.indexOf('Address');
    let tagsIndex = actualHeaders.indexOf('Tags');
    let actionIndex = actualHeaders.indexOf('Action');
    let tableData = [];

    let nextButtonXpath = `//li[@title="Next Page"]`;
    let nextButtonLocator = page.locator(nextButtonXpath)
    let isNextButtonDisabled = 'false';
    console.log("isNextButtonDisabled: " + isNextButtonDisabled)
    while('false' == isNextButtonDisabled){
        // let rowXpath = `//tbody[contains(concat(' ',normalize-space(@class),' '),' ant-table-tbody ')]//tr`;
        let rowXpath = `tbody tr`
        let rows = await tableLocator.locator(rowXpath).all();
        for(let row of rows){
            let nameXpath = `//td[${nameIndex + 1}]`;
            let name = await row.locator(nameXpath).textContent();
            let ageXpath = `//td[${ageIndex + 1}]`;
            let age = await row.locator(ageXpath).textContent();
            let addressXpath = `//td[${addressIndex + 1}]`;
            let address = await row.locator(addressXpath).textContent();
            let tagsXpath = `//td[${tagsIndex + 1}]//span`;
            let tags = await row.locator(tagsXpath).allTextContents();
            let data = {
                'Name' : name,
                'Age' : age,
                'Address' : address,
                'Tags' : tags
            }
            console.log("data : " + data)
            tableData.push(data);
        }
        isNextButtonDisabled = await nextButtonLocator.getAttribute('aria-disabled') ?? '';
        if('true' != isNextButtonDisabled){
            await nextButtonLocator.click();
        }
    }
    return tableData;
}
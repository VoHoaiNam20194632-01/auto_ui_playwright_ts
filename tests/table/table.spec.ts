import { test, expect, Page } from "@playwright/test";
import { expectedTableData } from "./table-test-data";

test(`Verify table`, async ({ page }) => {
    await page.goto(
        "https://test-with-me-app.vercel.app/learning/web-elements/components/table");
    let tableData = await getDataTableByTableName('Table',['Name', 'Age','Address','Tags','Action' ], page);
    console.log("data Table:", JSON.stringify(tableData, null, 2));
    // expect(tableData).toEqual(expect.arrayContaining(expectedTableData));
    // expect(expectedTableData).toEqual(expect.arrayContaining(tableData));
});

async function getDataTableByTableName(nameTable:string,expectHeaders:string[], page:Page) {
    let tableXpath =`(//div[.//span[normalize-space(text())="${nameTable}"] and @role="separator"]/following::table)[1]`
    let tableLocator = page.locator(tableXpath);
    let headerXpath = `//thead//tr//th[contains(concat(' ',normalize-space(@class),' '),' ant-table-cell ')]`;
    await page.waitForTimeout(1000)
    let headerLocator = await tableLocator.locator(headerXpath).all();
    let actualHeaders = [];
    for(let header of headerLocator){
        let textContent = await header.textContent();
        actualHeaders.push(textContent);
    }

    let listHeaderAndIndexes = [];

    for(let expectedHeader of expectHeaders){
        let currentIndex = actualHeaders.indexOf(expectedHeader);
        let mapObject ={
            header : expectedHeader,
            index: currentIndex
        }
        listHeaderAndIndexes.push(mapObject)
    }
    let tableData = [];

    let nextButtonXpath = `//li[@title="Next Page"]`;
    let nextButtonLocator = page.locator(nextButtonXpath)
    let isNextButtonDisabled = 'false';
    console.log("isNextButtonDisabled: " + isNextButtonDisabled)
    while('false' == isNextButtonDisabled){
        let rowXpath = `//tbody[contains(concat(' ',normalize-space(@class),' '),' ant-table-tbody ')]//tr`;
        let rows = await tableLocator.locator(rowXpath).all();
        for(let row of rows){
            let rowData: any = {};
            for(let mapObject of listHeaderAndIndexes){
                let tdXpath = `//td[${mapObject.index + 1}]`;
                let tdValue
                if(mapObject.header == 'Tags'){
                    tdValue = await row.locator(`${tdXpath}//span[contains(@class,'ant-tag')]`).allTextContents();
                }else{
                tdValue = await row.locator(tdXpath).textContent();
                }
                rowData[`${mapObject.header}`] = tdValue
            }
            console.log("data : " + rowData)
            tableData.push(rowData)
        }
        isNextButtonDisabled = await nextButtonLocator.getAttribute('aria-disabled') ?? '';
        if('true' != isNextButtonDisabled){
            await nextButtonLocator.click();
        }
    }
    return tableData;
}
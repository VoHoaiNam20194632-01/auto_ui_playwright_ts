import { test, expect, Page, Locator } from "@playwright/test";

    test(`Verify Transfer `, async ({ page }) => {
        // Go to page checkbox
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/components/transfer");

        await verifyTransferItemByLabel('Transfer', ['Apple', 'Banana'],'right', page);
        await verifyTransferItemByLabel('Transfer', ['Apple', 'Banana'],'left', page);
    })

    async function verifyTransferItemByLabel(label:string, items:string[], direction: 'left' | 'right',  page:Page) {
        //1. Move from lefr to right
        // get source items
        let sourcePanelXpath = `(//div[.//span[normalize-space(text())="${label}"] and @role="separator"]/following::div[.//span[normalize-space(text())="Source"] and contains(concat(' ',normalize-space(@class),' '),' ant-transfer-list ')])[1]`;
        let sourcePanelLocator = page.locator(sourcePanelXpath);
        let sourceItemsSelector = '.ant-transfer-list-content-item-text';
        let sourceItems = await sourcePanelLocator.locator(sourceItemsSelector).allTextContents();
        let targetPanelXpath = `(//div[.//span[normalize-space(text())="${label}"] and @role="separator"]/following::div[.//span[normalize-space(text())="Target"] and contains(concat(' ',normalize-space(@class),' '),' ant-transfer-list ')])[1]`;
        let targetPanelLocator = page.locator(targetPanelXpath);
        let targetItems = await targetPanelLocator.locator(sourceItemsSelector).allTextContents();

        //move item from source to target
        if(direction == 'right'){
        await moveItem(sourcePanelLocator, items);
        }else{
            await moveItem(targetPanelLocator, items);
        }

        let moveToRightButton = `//div[contains(concat(' ',normalize-space(@class),' '),' ant-transfer-operation ')]//button[.//span[@aria-label="${direction}"]]`;
        await page.locator(moveToRightButton).click();
    let sourceItemsExpected;
    let targetItemsExpected
        // Verify
        if(direction == 'right'){
             sourceItemsExpected = sourceItems.filter(v => !items.includes(v));
             targetItemsExpected = [...targetItems, ...items];
        }else{
             targetItemsExpected = targetItems.filter(v => !items.includes(v));
             sourceItemsExpected = [...sourceItems, ...items];
        }

        let sourceItemsActual = await sourcePanelLocator.locator(sourceItemsSelector).allTextContents();
        let targetItemsActual = await targetPanelLocator.locator(sourceItemsSelector).allTextContents();

        expect(sourceItemsActual).toEqual(expect.arrayContaining(sourceItemsExpected));
        expect(sourceItemsExpected).toEqual(expect.arrayContaining(sourceItemsActual));
        expect(targetItemsActual).toEqual(expect.arrayContaining(targetItemsExpected));
        expect(targetItemsExpected).toEqual(expect.arrayContaining(targetItemsActual));
    }

    async function moveItem(panel:Locator,items:string[]) {
        for(let item of items){
            let itemXpath = `//li[normalize-space(.)="${item}"]`;
            await panel.locator(itemXpath).click();
        }
    }
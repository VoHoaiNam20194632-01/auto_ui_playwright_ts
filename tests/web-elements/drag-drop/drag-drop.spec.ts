import { test, expect, Page, Locator } from "@playwright/test";
test(`Verify Drag and Drop `, async ({ page }) => {
        // Go to page checkbox
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/components/drag-n-drop");

        await verifyDragDropItemByLabel('Drag n Drop', ['Apple','Banane'],'toRight', page);
        await verifyDragDropItemByLabel('Drag n Drop', ['Mango','Grapes'],'toLeft', page);
    })

    async function verifyDragDropItemByLabel(label:string, inputs:string[], direction: 'toLeft' | 'toRight',page:Page) {
        let dragDropXpath = `(//div[.//span[normalize-space(text())="${label}"] and @role="separator"]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-space-gap-col-small ')])[1]`;
        let dragDropLocator = page.locator(dragDropXpath);
        // get list item left
        let leftPanelXpath = `.ant-space-item .border-teal-500` ;
        let leftPanelLocator = dragDropLocator.locator(leftPanelXpath);
        // get list item right
        let rigthPanelXpath = `.ant-space-item .border-orange-500` ;
        let rightPanelLocator = dragDropLocator.locator(rigthPanelXpath);

        let sourceLocator = direction == 'toRight' ?leftPanelLocator : rightPanelLocator;
        let targetLocator = direction == 'toRight' ?rightPanelLocator : leftPanelLocator;

        let currentItemsSource =await getPanelItems(sourceLocator);
        let currentItemsTarget =await getPanelItems(targetLocator);
        // if(direction == 'left') thì move list items từ trái qua phải
        
        for(let input of inputs){
            let itemXpath = `//button[normalize-space(.)="${input}"]`;
            let itemLocator = sourceLocator.locator(itemXpath);
            await itemLocator.dragTo(targetLocator)
        }

        let expectedSource = currentItemsSource.filter(v => !inputs.includes(v));
        let expectedTarget = [...currentItemsTarget, ...inputs]
        // get list item left
        currentItemsSource = await getPanelItems(sourceLocator);
        // get list item right
        currentItemsTarget = await getPanelItems(targetLocator);
        // compare
        expect(currentItemsSource).toEqual(expect.arrayContaining(expectedSource));
        expect(expectedSource).toEqual(expect.arrayContaining(currentItemsSource));
        expect(currentItemsTarget).toEqual(expect.arrayContaining(expectedTarget));
        expect(expectedTarget).toEqual(expect.arrayContaining(currentItemsTarget));
    }

    async function getPanelItems(panel:Locator) {
        return await panel.locator(`button`).allTextContents();
    }
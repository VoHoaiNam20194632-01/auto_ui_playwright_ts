import { test, expect, Page, Locator } from "@playwright/test";

    test(`Verify Tree Select `, async ({ page }) => {
        // Go to page checkbox
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/components/tree-select");
        
        await selectTreeItemByLabel('TreeSelect', 'Light->Pine',page)
        await expect(page.getByText('Current value: pine')).toBeVisible();

        await selectTreeItemByLabel('TreeSelect', 'Heavy->Mahogany',page)
        await expect(page.getByText('Current value: mahogany')).toBeVisible();

    })

    async function selectTreeItemByLabel(label:string, itemPath: string, page:Page) {
        let textBoxXpath =  `(//div[.//span[normalize-space()="${label}"] and @role="separator"]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-select-selector ')])[1]`;
        await page.locator(textBoxXpath).click();
        let items = itemPath.split('->');
        for(let i = 0; i < items.length; i++){
            if(i < items.length -1){
            let expanButtonXpath = `(//span[@title="${items[i]}"]//preceding::span[contains(concat(' ',normalize-space(@class),' '),' ant-select-tree-switcher ')])[last()]`;
            let expanButtonLocator = page.locator(expanButtonXpath);
            let className = await expanButtonLocator.getAttribute('class');
            if(!className?.split('').includes('ant-select-tree-switcher_open')){
                await expanButtonLocator.click();
            }
            }else{
                let itemXpath = `//span[contains(concat(' ',normalize-space(@class),' '),' ant-select-tree-node-content-wrapper-normal ') and normalize-space(.)="${items[i]}"]`;
                await page.locator(itemXpath).click();
            }
        }
        
    }
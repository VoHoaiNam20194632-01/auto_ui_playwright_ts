import { test, expect, Page, Locator } from "@playwright/test";
test(`Verify Drag and Drop `, async ({ page }) => {
        // Go to page checkbox
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/components/transfer");

        await verifyDragDropItemByLabel('Transfer', ['Apple', 'Banana'],'right', page);
    
    })

    async function verifyDragDropItemByLabel(label:string, items:string[], direction: 'left' | 'right',page:Page) {

        // get list item left
        let LeftXpath = ``
        // get list item right
        // if(direction == 'left') thì move list items từ trái qua phải
        // get list item left
        // get list item right     
        // compare   
    }
import { test, expect, Page } from "@playwright/test";
let textCheckBoxs = [
    "Apple", "Pear", "Orange"
];
for (let textCheckBox of textCheckBoxs) {
    test(`Verify checkbox ${textCheckBox}`, async ({ page }) => {
        // Go to page checkbox
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox");
        //xpathLocator check box
        //label[normalize-space(.)="Apple"]//span[contains(concat(' ',normalize-space(@class),' '),' ant-checkbox ')]
        for(let text of textCheckBoxs){
            await selectCheckboxByLabel(text,false,page);
        }
        
        await selectCheckboxByLabel(textCheckBox,true,page);
        // await
        await expect(page.getByText(`Selected values: ${textCheckBox}`))
            .toBeVisible();
    })
}

async function selectCheckboxByLabel(label: string, check : boolean, page: Page) {
    let xpathCheckBox = `//label[normalize-space(.)="${label}"]//span[contains(concat(' ',normalize-space(@class),' '),' ant-checkbox ')]`
    // check checkbox checked
    let classCheckbox = await page.locator(xpathCheckBox).getAttribute("class");
    // let currentStatus = classCheckbox?.match("ant-checkbox-checked")?.length ?? 0;
    let checkChecked = classCheckbox?.split(" ").includes("ant-checkbox-checked");
    // click checkbox 
    if ((!checkChecked && check) || (checkChecked && !check)) {
        let xpathLabel = `//label[normalize-space(.)="${label}" and .//input[@type="checkbox"]]`;
        await page.locator(xpathLabel).click();
    }
}




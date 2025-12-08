import{test,Page, expect} from "@playwright/test"
// let textRadios =["Apple","Pear","Orange"]
// let xpathDivRadios = "//div[contains(concat(' ',normalize-space(@class),' '),' ant-radio-group ')]"
// test("Verify radio button", async({page})=>{
//     await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/radio");
//     const qtyDivRadio = await getQtyElementRadio(xpathDivRadios,page);
//     console.log("qty div radio :", qtyDivRadio);
//     if(qtyDivRadio > 0){
//         for (let index = 1; index <= qtyDivRadio; index++) {
//         let xpathDivRadio = `//div[contains(concat(' ',normalize-space(@class),' '),' ant-radio-group ')][${index}]`
//         let xpathValue = `//div[normalize-space(text())='Value:'][${index}]//span`;
//     for(let textRadio of textRadios){
//         //label[.//span[normalize-space(text())="Apple"]]
//         let xpathRadio = xpathDivRadio +`//label[.//span[normalize-space(text())="${textRadio}"]]`
//         await page.locator(xpathRadio).click();
//         await expect(page.locator(xpathValue).getByText(`${textRadio}`)).toBeVisible();
//     }}}
// })

// async function getQtyElementRadio(xpath:string, page:Page): Promise<number> {
//     try {
//         const count = page.locator(xpath).count();
//         return count;
//     } catch (error) {
//         console.log(`Loi khi dem so luong element : ${xpath}`, error);
//         return 0;
//     }
// }

test("Verify radio", async({page})=>{
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/radio');
    await selectRadioByLabel('Radio button', 'Pear', page);
    await expect(page.getByText(`Value: Pear`).first()).toBeVisible();
})

async function selectRadioByLabel(label:string,option:string, page:Page){
    let xpath =`//div[normalize-space(.)="${label}"]/following-sibling::div//div[contains(concat(' ',normalize-space(@class),' '),' ant-radio-group ')][1]//label[normalize-space(.)="${option}"]`;
    await page.locator(xpath).click();
}
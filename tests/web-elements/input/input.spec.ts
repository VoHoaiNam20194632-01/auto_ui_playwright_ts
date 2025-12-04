import { test, Page, expect } from "@playwright/test"
import { inputData } from "./input-data";
// let textInputs = [
//     "Normal Input", "Input Number", "Text Area", "Password Box", "OTP Box"
// ];
// for (let textInput of textInputs) {
//     test(`Verify input ${textInput}`, async ({ page }) => {
//         await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/input");
//         await enterInput(textInput, "240812", page);
//         await expect(page.getByText(`240812`)).toBeVisible();
//     })
// }

// async function enterInput(textInput: string, value: string, page: Page) {
//     //div[@role="separator" and span[normalize-space(.)="OTP Box"]]/following-sibling::*[1]//input | //div[@role="separator" and span[normalize-space(.)="Input Number"]]/following-sibling::*[1][self::input or self::textarea]
//     let xpathInput = `//div[@role="separator" and span[normalize-space(.)="${textInput}"]]/following-sibling::*[1]//input | //div[@role="separator" and span[normalize-space(.)="${textInput}"]]/following-sibling::*[1][self::input or self::textarea]`
//     // Lấy tất cả element matching XPath
//     const elements = await page.$$(xpathInput);

//     if (elements.length === 0) {
//         throw new Error(`Không tìm thấy input cho label: ${textInput}`);
//     }

//     // Nếu chỉ có 1 element -> điền giá trị trực tiếp
//     if (elements.length === 1) {
//         await elements[0].fill(value);
//     } else {
//         // Nếu nhiều element (ví dụ OTP Box) -> điền từng ký tự
//         const chars = value.split("");
//         for (let i = 0; i < Math.min(elements.length, chars.length); i++) {
//             await elements[i].fill(chars[i]);
//         }
//     }
// }

// // test(`Verify normal input`, async({page})=>{
// //     await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/input");
// //     let xpath =``;
// //     await page.locator(xpath).fill("Test With Me");
// //     await expect(page.getByText('Value: Test With Me')).toBeVisible();
// // })

// // async function inputTextByLabel(page:Page, label:string, input:string) {
// //     let xpath1 =`(//div[@role="separator" and span[normalize-space(.)="Input Number"]]/following::input)[1]`;
// //     let c
// // }
for (let testData of inputData) {
    test(`Verify ${testData.label}`, async ({ page }) => {
        await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
        await inputTextByLabel(page, testData.label, testData.input);
        await expect(page.getByText(`Value: ${testData.input}`)).toBeVisible();
    });
}
async function inputTextByLabel(page: Page, label: string, input: string) {
    let xpath1 = `//div[@role="separator" and .//span[normalize-space(.)="${label}"]]/following::input`;
    let xpath2 = `//div[@role="separator" and .//span[normalize-space(.)="${label}"]]/following::textarea`;
    let locator = page.locator(`(${xpath1} | ${xpath2})[1]`);
    await locator.clear();
    await locator.fill(input);
    await page.keyboard.press('Enter');
}

test(`Verify input number - Increase/Decrease`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
    let initialValue = 10;
    await inputTextByLabel(page, "Input Number", `${initialValue}`);
    //identify input locator
    let xpath = `(//div[@role="separator" and .//span[normalize-space(.)="Input Number"]]/following::input)[1]`;
    let locator = page.locator(xpath);
    //get step value
    let stepValue = await locator.getAttribute('step') ?? "";
    console.log("step value : " + stepValue);
    //Hover input
    await locator.hover();
    //Click on increase button
    //span[@aria-label="Increase Value"]
    let xpathIncreaseButton = `//div[@role="separator" and .//span[normalize-space(.)="Input Number"]]/following::span[@aria-label="Increase Value"]`
    //Verify number -> input number + step
    await page.locator(xpathIncreaseButton).click();
    await expect(page.getByText(`Value: ${initialValue + Number.parseInt(stepValue)}`)).toBeVisible();
    //Click on decrease button
    let decreaseButtonXpath = `//div[@role="separator" and .//span[normalize-space(.)="Input Number"]]/following::span[@aria-label="Decrease Value"]`
    //span[@aria-label="Decrease Value"]
    await page.locator(decreaseButtonXpath).click();
    await expect(page.getByText(`Value: ${initialValue}`)).toBeVisible();
    //Verify number -> input number - step
});

test(`Verify otp`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
    let otp ="123456";
    let xpath = `(//div[@role="separator" and span[normalize-space(.)="OTP Box"]]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-otp ')])[1]//input`; //elements
    let inputs = await page.locator(xpath).all();
    for(let i = 0; i < 6; i++){
        await inputs[i].fill(otp[i]);
    }
    await expect(page.getByText(`Value: ${otp}`)).toBeVisible();
});
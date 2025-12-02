import{test, Page, expect} from "@playwright/test"
let textInputs = [
    "Normal Input", "Input Number", "Text Area", "Password Box", "OTP Box"
];
for(let textInput of textInputs){test(`Verify input ${textInput}`, async({page}) =>{
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/input");
    await enterInput(textInput,"240812",page);
    await expect(page.getByText(`${textInput}`)).toBeVisible();
})}

async function enterInput(textInput: string, value: string, page:Page) {
    //div[@role="separator" and span[normalize-space(.)="OTP Box"]]/following-sibling::*[1]//input | //div[@role="separator" and span[normalize-space(.)="Input Number"]]/following-sibling::*[1][self::input or self::textarea]
    let xpathInput = `//div[@role="separator" and span[normalize-space(.)="${textInput}"]]/following-sibling::*[1]//input | //div[@role="separator" and span[normalize-space(.)="${textInput}"]]/following-sibling::*[1][self::input or self::textarea]`
        // Lấy tất cả element matching XPath
    const elements = await page.$$(xpathInput);

    if (elements.length === 0) {
        throw new Error(`Không tìm thấy input cho label: ${textInput}`);
    }

    // Nếu chỉ có 1 element -> điền giá trị trực tiếp
    if (elements.length === 1) {
        await elements[0].fill(value);
    } else {
        // Nếu nhiều element (ví dụ OTP Box) -> điền từng ký tự
        const chars = value.split("");
        for (let i = 0; i < Math.min(elements.length, chars.length); i++) {
            await elements[i].fill(chars[i]);
        }
    }
}
import { test, expect, Page, Locator } from "@playwright/test";
import path from "path";

    test(`Verify Upload file`, async ({ page }) => {
        // Go to page checkbox
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/components/upload");
        await uploadFileByLabel('Upload file', 'tests/upload/DSC_5187.jpg',page);
        await expect(page.getByText('DSC_5187.jpg')).toBeVisible();
    })

    async function uploadFileByLabel(label:string, filePath:string,page:Page) {
        let xpath = `(//div[.//span[normalize-space()="${label}"] and @role="separator"]/following::input[@type="file"])[1]`;
        let absolutePath = path.join(process.cwd(), filePath);
        await page.locator(xpath).setInputFiles(absolutePath);
    }
import { expect, Page } from "@playwright/test";
export class CommonPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async inputTextBoxByLabel(label: string, input: string) {
        let inputXpath = `(//label[normalize-space(text())="${label}"]//following::input)[1]`
        await this.page.locator(inputXpath).fill(input);
    }
    async clickButtonByLabel(label: string) {
        let buttonXpath = `//button[normalize-space()="${label}"]`;
        await this.page.locator(buttonXpath).click();
    }

    async verifyValidationMessageByLabel(label: string, message: string) {
        let messageXpath = `(//label[normalize-space(text())="${label}"]//following::p[normalize-space()="${message}" and contains(concat(' ',normalize-space(@class),' '),' field-error ')])[1]`;
        await expect(this.page.locator(messageXpath)).toBeVisible();
    }
}

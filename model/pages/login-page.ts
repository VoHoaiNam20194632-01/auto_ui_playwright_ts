import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common-page";

export class LoginPage extends CommonPage{
    constructor(page: Page) {
        super(page);
    }

    async adminLogin() {
        await this.inputTextBoxByLabel('Email', 'test@with.me');
        await this.inputTextBoxByLabel('Password', '24081201Nam@');
        await this.clickButtonByLabel('SIGN IN')
        await expect(this.page.locator('.page-heading-title')).toHaveText('Dashboard');
    }
}
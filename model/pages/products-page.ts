import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common-page";
import path from "path";

export class ProductsPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    async isDisplay() {
        await expect(this.page.locator('//table[.//th[normalize-space()="Thumbnail"] and .//th[normalize-space()="SKU"]]')).toBeVisible();
    }

    async searchProduct(input:string){
        let inputXpath = `//input[@id="field-keyword"]`;
        let locator = this.page.locator(inputXpath);
        await locator.click();
        await locator.clear();
        await locator.fill(input);
        await this.page.keyboard.press('Enter');
    }

    async selectProductByName(productName:string){
        let xpath = `//a[normalize-space()="${productName}"]`;
        await this.page.locator(xpath).click();
    }
}
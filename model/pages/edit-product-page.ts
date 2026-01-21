import { expect, Page } from "@playwright/test";
import { CommonPage } from "../common-page";
import path from "path";

export class EditProductPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    async isDisplay(productName:string) {
        await expect(this.page.getByText(`${productName}`)).toBeVisible();
    }

    getProductId(){
        let url = this.page.url();
        // http://localhost:3000/admin/products/edit/dae69589-4d0b-4e1d-bffb-4d6117a98922
        let urlSplitted = url.split('/');
        return urlSplitted[urlSplitted.length - 1].trim();
    }

}
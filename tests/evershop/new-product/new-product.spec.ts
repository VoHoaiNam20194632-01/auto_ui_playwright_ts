import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../../model/pages/login-page";
import { NewProductPage } from "../../../model/pages/new-product-page";
import { DashboardPage } from "../../../model/pages/dashboard-page";

let loginPage: LoginPage;
let newProductPage: NewProductPage
let dashboardPage: DashboardPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    newProductPage = new NewProductPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto("http://localhost:3000/admin/login");
    await loginPage.adminLogin();
})

test("Verify create new product", async ({ page }) => {
    console.log('Create new product');
    await dashboardPage.clickMenuByLabel('New Product');
    await newProductPage.isDisplay();
    await newProductPage.inputTextByLabel('Product Name', "Giày Chạy Bộ Biti's Hunter Running Nam Màu Xanh Dương HSM011000XDG");
    await newProductPage.inputTextByLabel('SKU', "SKU-123");
    await newProductPage.inputTextByLabel('Price', "50");
    await newProductPage.inputTextByLabel('Weight', "1");
    await newProductPage.inputTextByLabel('Quantity', "100");
    await newProductPage.inputTextByLabel('URL Key', "nam");
    await newProductPage.inputTextByLabel('Meta Title', "BITIS, CHAY BO");
    await newProductPage.selectDropdownByLabel('Tax Class', 'Taxable Goods');
    await newProductPage.selectDropdownByLabel('Attribute group', 'Default');
    await newProductPage.clickRadioButtonByLabel('Status', 'Disabled');
    await newProductPage.clickRadioButtonByLabel('Visibility', 'Not visible individually');
    await newProductPage.clickRadioButtonByLabel('Manage Stock', 'No');
    await newProductPage.clickRadioButtonByLabel('Stock Availability', 'Out of Stock');
    await newProductPage.selectDropdownByLabel('Color', 'Black');
    await newProductPage.selectDropdownByLabel('Size', 'XXL');
    await newProductPage.uploadImage('data/new-product/image/DSC_4950.jpg');
    await newProductPage.inputTextAreaByLabel('Meta Description', 'Meta Description');
    await newProductPage.clickButtonByLabel('Save');
    await newProductPage.verifyPopupMessage('Product updated successfully');
});
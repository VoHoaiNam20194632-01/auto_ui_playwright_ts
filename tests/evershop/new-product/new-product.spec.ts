import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../../model/pages/login-page";
import { NewProductPage } from "../../../model/pages/new-product-page";
import { DashboardPage } from "../../../model/pages/dashboard-page";
import { ProductsPage } from "../../../model/pages/products-page";
import { EditProductPage } from "../../../model/pages/edit-product-page";

let loginPage: LoginPage;
let newProductPage: NewProductPage
let dashboardPage: DashboardPage
let productsPage: ProductsPage
let editProductPage: EditProductPage
let productIds: string[] = [];
let cookieHeader: string
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    newProductPage = new NewProductPage(page);
    dashboardPage = new DashboardPage(page);
    productsPage = new ProductsPage(page);
    editProductPage = new EditProductPage(page);
    await page.goto("http://localhost:3000/admin/login");
    await loginPage.adminLogin();
    cookieHeader = await loginPage.builCookieHeader();
})

test.afterAll(async ({ request }) => {
    for (let productId of productIds) {
        await editProductPage.deleteProductByApi(productId, cookieHeader);
    }
})

test("Verify create new product", async ({ page, request }) => {
    const random = new Date().getTime();
    console.log('Create new product');
    await dashboardPage.clickMenuByLabel('New Product');
    await newProductPage.isDisplay();
    const productName = `Giày Chạy Bộ Biti's ${random}`;
    await newProductPage.inputTextByLabel('Product Name', productName);
    await newProductPage.inputTextByLabel('SKU', `SKU-${random}`);
    await newProductPage.inputTextByLabel('Price', "50");
    await newProductPage.inputTextByLabel('Weight', "1");
    await newProductPage.inputTextByLabel('Quantity', "100");
    await newProductPage.inputTextByLabel('URL Key', `nam${random}`);
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
    await newProductPage.verifyPopupMessage('Product created successfully');
    await newProductPage.clickMenuByLabel('Products');
    productsPage.isDisplay();
    await productsPage.searchProduct(random.toString());
    await productsPage.selectProductByName(productName);
    await editProductPage.isDisplay(`Editing ${productName}`);
    await expect(await editProductPage.getFieldValueByLabel('Product Name')).toEqual(productName);
    let productId = editProductPage.getProductId();
    productIds.push(productId)
});

test("Verify create new product 2", async ({ page, request }) => {
    const random = new Date().getTime();
    console.log('Create new product');
    await dashboardPage.clickMenuByLabel('New Product');
    await newProductPage.isDisplay();
    const productName = `Giày Chạy Bộ Biti's ${random}`;
    await newProductPage.inputTextByLabel('Product Name', productName);
    await newProductPage.inputTextByLabel('SKU', `SKU-${random}`);
    await newProductPage.inputTextByLabel('Price', "50");
    await newProductPage.inputTextByLabel('Weight', "1");
    await newProductPage.inputTextByLabel('Quantity', "100");
    await newProductPage.inputTextByLabel('URL Key', `nam${random}`);
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
    await newProductPage.verifyPopupMessage('Product created successfully');
    await newProductPage.clickMenuByLabel('Products');
    productsPage.isDisplay();
    await productsPage.searchProduct(random.toString());
    await productsPage.selectProductByName(productName);
    await editProductPage.isDisplay(`Editing ${productName}`);
    await expect(await editProductPage.getFieldValueByLabel('Product Name')).toEqual(productName);
    let productId = editProductPage.getProductId();
    productIds.push(productId)
});

test("Verify error message when server return 500 error", async ({ page, request }) => {
    const random = new Date().getTime();
    console.log('Create new product');
    await dashboardPage.clickMenuByLabel('New Product');
    await newProductPage.isDisplay();
    const productName = `Giày Chạy Bộ Biti's ${random}`;
    await newProductPage.inputTextByLabel('Product Name', productName);
    await newProductPage.inputTextByLabel('SKU', `SKU-${random}`);
    await newProductPage.inputTextByLabel('Price', "50");
    await newProductPage.inputTextByLabel('Weight', "1");
    await newProductPage.inputTextByLabel('Quantity', "100");
    await newProductPage.inputTextByLabel('URL Key', `nam${random}`);
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
    page.route('*/**/api/products', async route => {
        await route.fulfill({
            json: {
                error: {
                    status: 500,
                    message: "Internal Server Error"
                }
            }, status: 500
        });
    });
    await newProductPage.clickButtonByLabel('Save');
    await newProductPage.verifyPopupMessage('Internal Server Error');

});
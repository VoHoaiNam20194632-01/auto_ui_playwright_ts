import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../../model/pages/login-page";

let loginPage:LoginPage;

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    await page.goto("http://localhost:3000/admin/login");
    await loginPage.adminLogin();
})

test("Verify create new product", async ({ page }) => {
    console.log('Create new product');
    
});
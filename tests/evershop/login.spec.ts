import { test, expect, Page } from "@playwright/test";
import { verify } from "crypto";

test("Verify admin login successful", async ({ page }) => {
    await page.goto("http://localhost:3000/admin/login");

    await inputTextBoxByLabel('Email', 'test@with.me', page);
    await inputTextBoxByLabel('Password', '24081201Nam@', page);
    await clickButtonByLabel('SIGN IN', page)
    await expect(page.locator('.page-heading-title')).toHaveText('Dashboard');
});

const invalidLogin = [
    {
        testCaseName: 'Verify email empty',
        input: {
            'Email': '',
            'Password': '12345678'
        },
        expect: {
            'Email': 'Email is required'
        }
    },
    {
        testCaseName: 'Verify password empty',
        input: {
            'Email': 'test@with.me',
            'Password': ''
        },
        expect: {
            'Password': 'Password is required'
        }
    },
    {
        testCaseName: 'Verify email and password empty',
        input: {
            'Email': '',
            'Password': ''
        },
        expect: {
            'Email': 'Email is required',
            'Password': 'Password is required'
        }
    },
]

for (let data of invalidLogin) {
    test(data.testCaseName, async ({ page }) => {
        await page.goto("http://localhost:3000/admin/login");
        for (let field in data.input) {
            //@ts-ignore
            await inputTextBoxByLabel(field, data.input[`${field}`], page);
        }

        await clickButtonByLabel('SIGN IN', page)

        for (let field in data.expect) {
            //@ts-ignore
            await verifyValidationMessageByLabel(field, data.expect[`${field}`], page);
        }
    });
}

async function verifyValidationMessageByLabel(label:string, message:string, page:Page) {
    let messageXpath = `(//label[normalize-space(text())="${label}"]//following::p[normalize-space()="${message}" and contains(concat(' ',normalize-space(@class),' '),' field-error ')])[1]`;
    await expect(page.locator(messageXpath)).toBeVisible();
}

async function inputTextBoxByLabel(label: string, input: string, page: Page) {
    let inputXpath = `(//label[normalize-space(text())="${label}"]//following::input)[1]`
    await page.locator(inputXpath).fill(input);
}

async function clickButtonByLabel(label: string, page: Page) {
    let buttonXpath = `//button[normalize-space()="${label}"]`;
    await page.locator(buttonXpath).click();
}
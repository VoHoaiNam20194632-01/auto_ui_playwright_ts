import { test, expect, Page } from "@playwright/test";
let textNotifications = ["Success", "Info", "Warning", "Error"]

for(let textNotification of textNotifications){
test(`Verify Notification ${textNotification}`, async ({ page }) => {
  await page.goto(
    "https://test-with-me-app.vercel.app/learning/web-elements/components/notification"
  );
  // Click on button
  await verifyNotificationMessage(textNotification,page);
});
}

async function verifyNotificationMessage(messageType:string, page:Page) {
    //click button button Notification
    let buttonXpath = `//div[.//span[normalize-space(text())="Notification"] and @role="separator"]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-space-item ')]//button[normalize-space(.)="${messageType}"]`
    await page.locator(buttonXpath).click();
    await expect(page.getByText(`Notification ${messageType}`)).toBeVisible();
    await expect(page.getByText(`You have clicked the ${messageType} button.`)).toBeVisible();
    // let iconNotificationXpath = `//div[contains(concat(' ',normalize-space(@class),' '),' ant-notification-notice-with-icon ')]//span[@role="img"]`
    // let iconNotificationLocator = page.locator(iconNotificationXpath);
    // const expectedClassPart = `ant-notification-notice-icon-${messageType.toLowerCase()}`;
    // await expect(iconNotificationLocator, `Lỗi sai Notification icon "${messageType}, class actual : ${iconNotificationLocator.getAttribute('class')}"`).toHaveClass(
    //     new RegExp(expectedClassPart),  // Dùng regex để check chứa phần class mong muốn
    //     { timeout: 5000 }
    // );
    let modalNameUpper = messageType.toUpperCase();
    let buttonCloseNotification = `//div[contains(concat(' ',normalize-space(@class),' '),' ant-notification-notice-wrapper ') and .//div[contains(concat(' ',normalize-space(text()),' '),' Notification ${modalNameUpper} ')]]//a[@aria-label="Close"]`;
    await page.locator(buttonCloseNotification).click();
}
import { test, expect, Page } from "@playwright/test";
let textNotifications = ["Success", "Info", "Warning", "Error"]

for(let textNotification of textNotifications){
test(`Verify Notification ${textNotification}`, async ({ page }) => {
  await page.goto(
    "https://test-with-me-app.vercel.app/learning/web-elements/components/notification"
  );
  // Click on button
  await selectButtonOnNotificationAndVerify(textNotification,page);

  await expect(page.getByText(`Notification ${textNotifications}`)).toBeVisible();
  await expect(page.getByText(`You have clicked the ${textNotifications} button.`)).toBeVisible();
});
}

async function selectButtonOnNotificationAndVerify(modalName:string, page:Page) {
    //click button button Notification
    let buttonModalXpath = `//div[.//span[normalize-space(text())="Notification"] and @role="separator"]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-space-item ')]//button[normalize-space(.)="${modalName}"]`
    await page.locator(buttonModalXpath).click();
    let iconNotificationXpath = `//div[contains(concat(' ',normalize-space(@class),' '),' ant-notification-notice-with-icon ')]//span[@role="img"]`
    let iconNotificationClass = await page.locator(iconNotificationXpath).getAttribute("class") 
    // let modalNameUpper = modalName.toUpperCase();
    // let buttonCloseNotification = `//div[contains(concat(' ',normalize-space(@class),' '),' ant-notification-notice-wrapper ') and .//div[contains(concat(' ',normalize-space(text()),' '),' Notification ${modalNameUpper} ')]]//a[@aria-label="Close"]`;
    // await page.locator(buttonCloseNotification).click();
}
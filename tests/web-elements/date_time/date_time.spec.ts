import { test, Page } from "@playwright/test"
let textDateTimes = ["Time Picker", "Time Range Picker", "Date Picker", "Multiple Date Picker", "Date Range Picker"]

for(let textDateTime of textDateTimes){
    test(`Verify Date Time ${textDateTime}`, async({page})=>{
        await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time");
        // check xem 
    })
}
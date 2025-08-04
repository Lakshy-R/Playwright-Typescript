import { test, expect } from '@playwright/test';
import { PageObject } from './page/PageObject';
import * as testData from './testData.json'
test.describe('Automation Form Submission', async () => {
    let pageObject : PageObject;

    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        pageObject = new PageObject(page);
        await pageObject.open('file:///c:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_8/index.html');
    });

    for(const data of Object.values(testData)){
        if(data.testName === 'Test 1 - Fill Input' || data.testName === 'Test 1 - Negative test') {
            test.skip(data.testName, async () => {
                await pageObject.fillFirstName(data.firstName);
                await pageObject.fillAge(data.age);
                if(data.isStudent) {
                    await pageObject.clickIsStudent();
                }
                await pageObject.clickApplyButton();

                const displayName = await pageObject.getText(pageObject.displayName);
                const displayAge = await pageObject.getText(pageObject.displayAge);
                const displayIsStudent = await pageObject.getText(pageObject.displayIsStudent);

                expect(displayName).toBe(data.expectedFirstName);
                expect(displayAge).toBe(data.expectedAge);
                expect(displayIsStudent).toBe(data.expectedIsStudent);
            });
        }

    }
});
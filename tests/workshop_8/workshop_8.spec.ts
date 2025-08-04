import { test, expect } from '@playwright/test';
import { PageObject } from './page/PageObject';

test.describe('Automation Form Submission', async () => {
    let pageObject : PageObject;

    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        pageObject = new PageObject(page);
        await pageObject.open('file:///c:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_8/index.html');
    });

    test.skip('Automation Form Submission', async () => {
        await pageObject.fillFirstName('John');
        await pageObject.fillAge('30');
        await pageObject.clickIsStudent();
        await pageObject.clickApplyButton();

        const displayName = await pageObject.getText(pageObject.displayName);
        const displayAge = await pageObject.getText(pageObject.displayAge);
        const displayIsStudent = await pageObject.getText(pageObject.displayIsStudent);

        expect(displayName).toBe('John');
        expect(displayAge).toBe('30');
        expect(displayIsStudent).toBe('Yes');
    });
});
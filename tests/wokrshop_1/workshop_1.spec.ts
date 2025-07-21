import {test} from 'playwright/test';

test.skip('basic test', async ({ page }) => {
    await page.goto('https://gitlab.com');
    await page.waitForTimeout(3000);
    await page.reload();

})

test.skip('testing elements on gitlab', async ({ page }) => {
    await page.goto('https://gitlab.com');  
    await page.getByRole('link', { name: 'Get free trial' }).first().click();
    await page.getByTestId('new-user-first-name-field').fill('John');
    await page.getByTestId('new-user-last-name-field').fill('Doe');

})

test.skip('using various locators', async ({ page }) => {
    await page.goto('https://gitlab.com');
    await page.getByRole('link', { name: 'Sign in' }).click();
});
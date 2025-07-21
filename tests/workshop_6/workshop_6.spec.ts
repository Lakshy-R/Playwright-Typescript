import {test, expect} from '@playwright/test';

const testData = {
    firstname: 'testuser',
    lastname: 'testuser',
    address: 'dqwidjqwiowqjd',
    number: '0101010101'
}

test.describe('User Registration Tests', () => {
    test.skip('Register with valid data', async ({page}) => {
        await page.goto('file:///C:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_6/index.html');   
        await page.fill('#firstName', testData.firstname);
        await page.fill('#lastName', testData.lastname);
        await page.fill('#address', testData.address);
        await page.fill('#number', testData.number);
        await page.click('#register');

        const firstname = await page.locator('#displayFirstName').textContent();
        const lastname = await page.locator('#displayLastName').textContent();
        const address = await page.locator('#displayAddress').textContent();
        const number = await page.locator('#displayNumber').textContent();

        await expect(firstname).toBe(testData.firstname);
        await expect(lastname).toBe(testData.lastname); 
        await expect(address).toBe(testData.address);
        await expect(number).toBe(testData.number);
    })

    test.skip('Register with empty fields', async ({page}) => {
        await page.goto('file:///C:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_6/index.html');   
        await page.click('#register');

        const errorMessage = await page.locator('#error p').textContent();
        await expect(errorMessage).toBe('Please fill in all fields.');
    });
});
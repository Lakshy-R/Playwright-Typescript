import {test , expect} from '@playwright/test';

test.skip('Handeling Alerts', async ({page}) => {
    await page.goto('file:///C:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_4/index.html');

    let alertMessage = '';
    page.on('dialog', dialog => {
        expect(dialog.type()).toBe('alert');
        alertMessage = dialog.message();
        dialog.accept();
    });
    await page.click('button#show-alert');  
    expect(alertMessage).toBe('This is a simple alert.');
})

test.skip('Confirm Alerts', async ({page}) => {
await page.goto('file:///C:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_4/index.html');

    let alertMessage = '';
    page.on('dialog', dialog => {
        alertMessage = dialog.message();
        dialog.dismiss();
    });
    await page.click('button#show-confirm');  
    expect(alertMessage).toBe('You clicked Cancel.');
})

test.skip('Handeling POP-UPS', async ({page}) => {
    await page.goto('file:///C:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_4/index.html');
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('button#open-popup')
    ]);
    await newPage.waitForLoadState();

    if (newPage.url() === 'https://example.com') 
        expect(await newPage.title()).toBe('Example Domain');
    await newPage.close();
})
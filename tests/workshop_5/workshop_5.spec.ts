import {test , expect} from '@playwright/test';

test.skip('Open new window and navigate back', async ({ context, page }) => {
    await page.goto('C:\Users\laksh\Documents\GitHub\Playwright-Typescript\tests\workshop_5\index.html');
    const pagePromise = context.waitForEvent('page');
    await page.click('#openNewWindow');
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    //console.log('New window URL:', newPage.url());
    await expect(newPage.getByRole('heading', { name: 'Welcome to the New Page' })).toBeVisible();
})

test.skip('Add cookie', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/tests/workshop_5/index.html');
    await page.click('#setCookie');
    const cookies = await page.context().cookies('http://127.0.0.1:5500/tests/workshop_5/index.html');
    const cookie = cookies.find(c => c.name === 'session');
    console.log('Cookie:', cookie);
    await expect(cookie).toBeDefined();
});

test.skip('Delete cookie', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/tests/workshop_5/index.html');
    await page.click('#setCookie');
    const cookies = await page.context().cookies('http://127.0.0.1:5500/tests/workshop_5/index.html');
    const cookie = cookies.find(c => c.name === 'session');
    console.log('Cookie:', cookie);
    await page.click('#deleteCookie');
    const deletedcookies = await page.context().cookies('http://127.0.0.1:5500/tests/workshop_5/index.html');
    const deletedCookie = deletedcookies.find(c => c.name === 'session');
    console.log('Deleted Cookie:', deletedCookie);
    expect(deletedCookie).toBeUndefined();
});
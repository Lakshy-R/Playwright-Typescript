import {test, expect}  from '@playwright/test';
require('dotenv').config();
if(!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Please set USERNAME and PASSWORD in .env file');
}
const { USERNAME, PASSWORD } = process.env;

test.describe('Credit card web app tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/login');
        await page.getByPlaceholder('Enter your username').fill(USERNAME);
        await page.getByPlaceholder('Enter Password').fill(PASSWORD);
        await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
        await page.waitForNavigation(); 
        await page.waitForLoadState('networkidle')
    });

    test('login', async ({ page }) => {
    const url = page.url();
    expect(url).toBe('https://lib-app-c921f.web.app/dashboard');
    })

    test('logout', async ({ page }) => {
        await page.getByText('Log out', { exact: true }).click();
        await page.getByLabel('Dialog Close').nth(0).click();
        await page.waitForURL('**/auth/login');
        const url2 = page.url();
        expect(url2).toBe('https://lib-app-c921f.web.app/auth/login');
    })

    test('see transations', async ({ page }) => {
        await page.getByText('Show All').click();
        await expect(page.getByText('Transaction History')).toBeVisible();
        await page.waitForURL(/.*\/dashboard\/transaction.*/);
        expect(page.url()).toMatch(/\/dashboard\/transaction\?id=.*/);
    })

    test('card activation', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Card Activation');
        await page.waitForLoadState('networkidle');
        
        await expect(page.getByText('CardHolder Name')).toBeVisible();
        await expect(page.getByText('Card Number')).toBeVisible();  
        await expect(page.getByText('Expiry date')).toBeVisible();

    })

    test('Card Limit', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Card Limits');
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();
        await page.locator('[data-state="inactive"]').nth(1).click();
        await page.getByRole('textbox', { name: 'USD' }).click();
        await page.getByRole('textbox', { name: 'USD' }).fill('100');
        await page.click('text=Next');
        await page.waitForTimeout(1000);

    })

    test('report card', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Report Card');
        await page.waitForLoadState('networkidle');
        await page.click('text=Card Lost');
        await page.click('text=Next');
        await page.waitForTimeout(1000);
    })

    test('Set/Change PIN', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Set/Change PIN');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
    })

    test('Top Up', async ({ page }) => {
        await page.getByRole('button', { name: 'Top Up' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();
        await page.locator('[data-state="inactive"]').click();
        await page.getByRole('textbox', { name: 'USD' }).click();
        await page.getByRole('textbox', { name: 'USD' }).fill('100');
        await page.click('text=Next');
        await page.waitForTimeout(1000);
    })

})

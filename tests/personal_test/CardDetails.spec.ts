import {test, expect}  from '@playwright/test';
require('dotenv').config();
if(!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Please set USERNAME and PASSWORD in .env file');
}
const { USERNAME, PASSWORD } = process.env;
test.describe('Credit Details', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/login');
        await page.getByPlaceholder('Enter your username').fill(USERNAME);
        await page.getByPlaceholder('Enter Password').fill(PASSWORD);
        await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
        await page.waitForNavigation(); 
        await page.waitForLoadState('networkidle')
    });

    test('card Deatils', async ({ page }) => {
        
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Card Activation');
        await page.waitForLoadState('networkidle');
        
        await expect(page.getByText('CardHolder Name')).toBeVisible();
        await expect(page.getByText('Card Number')).toBeVisible();  
        await expect(page.getByText('Expiry date')).toBeVisible();

    })

    test('check card details', async ({ page }) => {
        
        const number = await page.getByText('Ending with').nth(0).textContent();
        const last4 = number?.slice(-4);
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Card Activation');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText('Card end with **** ' + last4)).toBeVisible();


    })

    test('check card details other card', async ({ page }) => {
        
        await page.locator('div.is_Button').nth(2).click();
        await page.waitForLoadState('networkidle');
        const number = await page.getByText('Ending with').nth(1).textContent();
        const last4 = number?.slice(-4);
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Card Activation');
        await page.waitForLoadState('networkidle');
        await expect(page.getByText('Card end with **** ' + last4)).toBeVisible();
    })
    
   
    
});

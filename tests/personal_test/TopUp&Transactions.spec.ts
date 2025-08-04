import { test, expect } from '@playwright/test';
require('dotenv').config();
if(!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Please set USERNAME and PASSWORD in .env file');
}
const { USERNAME, PASSWORD } = process.env;

test.describe('Transactions', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('https://lib-app-c921f.web.app/auth/login');
            await page.getByPlaceholder('Enter your username').fill(USERNAME);
            await page.getByPlaceholder('Enter Password').fill(PASSWORD);
            await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
            await page.waitForNavigation(); 
            await page.waitForLoadState('networkidle')
    })
    test('Single Transaction', async ({ page }) => {
        test.setTimeout(40000);
        await page.getByRole('button', { name: 'Top Up' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();
        await page.locator('[data-state="inactive"]').nth(0).click();
        await page.getByRole('textbox', { name: 'USD' }).click();
        await page.getByRole('textbox', { name: 'USD' }).fill('100');
        await page.click('text=Next');
        await page.locator('text=Send').nth(1).click();
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('1111');
        await page.locator('text=Verify').nth(1).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Back To Home');
        await page.waitForTimeout(5000);
        await page.waitForLoadState('networkidle');
        expect(page.locator('._dsp-flex._ai-center._fd-row._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._pt-t-space-m._pb-t-space-m._jc-space-betwe3241').nth(0).getByText('100.0 USD')).toBeVisible();
        await page.locator('div.is_Button').nth(2).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        expect(page.locator('._dsp-flex._ai-center._fd-row._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._pt-t-space-m._pb-t-space-m._jc-space-betwe3241').nth(0).getByText('-100.0 USD')).toBeVisible();
        
        
        
        
        await page.getByRole('button', { name: 'Top Up' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();
        await page.locator('[data-state="inactive"]').nth(0).click();
        await page.getByRole('textbox', { name: 'USD' }).click();
        await page.getByRole('textbox', { name: 'USD' }).fill('100');
        await page.click('text=Next');
        await page.locator('text=Send').nth(1).click();
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('textbox').nth(1).fill('1111');
        await page.locator('text=Verify').nth(1).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Back To Home');
        await page.waitForTimeout(5000);
        await page.waitForLoadState('networkidle');
        await page.locator('div.is_Button').nth(1).click();
        await page.locator('div.is_Button').nth(2).click();
        expect(page.locator('._dsp-flex._ai-center._fd-row._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._pt-t-space-m._pb-t-space-m._jc-space-betwe3241').nth(0).getByText('100.0 USD')).toBeVisible();
        await page.locator('div.is_Button').nth(1).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        expect(page.locator('._dsp-flex._ai-center._fd-row._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._pt-t-space-m._pb-t-space-m._jc-space-betwe3241').nth(0).getByText('-100.0 USD')).toBeVisible();
    })


})
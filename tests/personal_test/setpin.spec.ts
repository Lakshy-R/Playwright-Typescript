import {test , expect} from '@playwright/test';
require('dotenv').config();
if(!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Please set USERNAME and PASSWORD in .env file');
}
const { USERNAME, PASSWORD } = process.env;

test.describe('Set PIN Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/login');
        await page.getByPlaceholder('Enter your username').fill(USERNAME);
        await page.getByPlaceholder('Enter Password').fill(PASSWORD);
        await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
        await page.waitForNavigation(); 
        await page.waitForLoadState('networkidle')
    });


    test('Verify Set PIN page', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Set/Change PIN');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(4000);
    
    })

    test('OPT button disabled not enough numbers', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Set/Change PIN');
        await page.waitForLoadState('networkidle');
        const textbox = page.getByRole('textbox');
        await textbox.fill('12');
        const VerifyButton = page.locator('div.is_Button:has-text("Verify")')
        await expect(VerifyButton).toHaveAttribute('aria-disabled', 'true');
    })

    test('OPT button enabled enough numbers', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Set/Change PIN');
        await page.waitForLoadState('networkidle');
        const textbox = page.getByRole('textbox');
        await textbox.fill('1234');
        const VerifyButton = page.locator('div.is_Button:has-text("Verify")')
        await expect(VerifyButton).not.toHaveAttribute('aria-disabled', 'true');
    })

    test('Verify PIN input number keyboard appears on click', async ({ page }) => {
        await page.getByRole('button', { name: 'Manage' }).click();
        await page.waitForLoadState('networkidle');
        await page.click('text=Set/Change PIN');
        await page.waitForLoadState('networkidle');
        const textbox = page.getByRole('textbox');
        await textbox.click();
        await expect(textbox).toBeFocused();
    })

})

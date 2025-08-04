import {test , expect} from '@playwright/test';
import testData from './test.json' assert { type: 'json' };
require('dotenv').config();
if(!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Please set USERNAME and PASSWORD in .env file');
}
const { USERNAME, PASSWORD } = process.env;

test.describe('Top Up', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/login');
        await page.getByPlaceholder('Enter your username').fill(USERNAME);
        await page.getByPlaceholder('Enter Password').fill(PASSWORD);
        await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
        await page.waitForNavigation(); 
        await page.waitForLoadState('networkidle')
        await page.route('*/**/api/v1/agb/cards', async (route) => {
            const json = testData;
            await route.fulfill({ json });
        });
    });

    test('Error message when 0', async ({ page }) => {
        await page.getByRole('button', { name: 'Top Up' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();
        await page.locator('[data-state="inactive"]').nth(1).click();
        await page.getByRole('textbox', { name: 'USD' }).click();
        await page.getByRole('textbox', { name: 'USD' }).fill('0');
        expect(page.getByText('Must be greater than 0')).toBeVisible();
    });

    test.skip('Top Up expired card not appear', async ({ page }) => {

        await page.getByRole('button', { name: 'Top Up' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();
        await expect( page.getByText('442441******1001')).not.toBeVisible();
        
    });

    test('Top Up invalid card not appear', async ({ page }) => {

        await page.getByRole('button', { name: 'Top Up' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();
        const group = page.getByRole('group');
        await expect( page.getByText('442441******1002')).not.toBeVisible();
        
    });

    test('Only valid cards are visible in group', async ({ page }) => {

        await page.getByRole('button', { name: 'Top Up' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('combobox').click();

        const validCards = testData.filter(card => card.statusName === 'VALID CARD');

        const group = page.getByRole('group');
        for (const card of testData.slice(1)) {
            
            if (card.statusName === 'VALID CARD') {
            await expect(page.getByText(card.cardMask)).toBeVisible();
            } else {
            await expect(page.getByText(card.cardMask)).not.toBeVisible();
            }
        }
        });
    
})
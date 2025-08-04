import {test, expect} from '@playwright/test';
import transations from './transations.json' assert { type: 'json' };
import transationsCard from './transationsCard.json' assert { type: 'json' };
import emptyTransations from './emptyTransations.json' assert { type: 'json' };
import multipleTransations from './MultipleTransations.json' assert { type: 'json' };

require('dotenv').config();
if(!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Please set USERNAME and PASSWORD in .env file');
}
const { USERNAME, PASSWORD } = process.env;

test.describe('Check transation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/login');
        await page.getByPlaceholder('Enter your username').fill(USERNAME);
        await page.getByPlaceholder('Enter Password').fill(PASSWORD);
        await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
        await page.waitForNavigation(); 
        await page.waitForLoadState('networkidle')
        
        await page.route('*/**/api/v1/agb/cards', async (route) => {
            const json = transationsCard;
            await route.fulfill({ json });
        });
        
    });
    
    test('Bilingual - Check that transactions are retrieved successfully ', async ({ page }) => {
        await page.route('*/**/api/v1/agb/cards', async (route) => {
            const json = transationsCard;
            await route.fulfill({ json });
        });
        await page.route('*/**/api/v1/agb/cards/transactions/100000189902', async (route) => {
            const json = transations;
            await route.fulfill({ json });
            
        });
        
        await page.getByText('Show All').click();
        await expect(page.getByText('Transaction History')).toBeVisible();
        await expect(page.getByText('95840247')).toBeVisible();
    
    })

    test('Empty Transations ', async ({ page }) => {
        await page.route('*/**/api/v1/agb/cards/transactions/100000189902', async (route) => {
            const json = emptyTransations;
            await route.fulfill({ json });
        });
        await page.getByText('Show All').click();
        await expect(page.getByText('Transaction History')).toBeVisible();
        await expect(page.getByText('No transaction found')).toBeVisible();
    
    })

    test('Multiple Transations ', async ({ page }) => {
        await page.route('*/**/api/v1/agb/cards', async (route) => {
            const json = transationsCard;
            await route.fulfill({ json });
        });
        await page.route('*/**/api/v1/agb/cards/transactions/100000189902', async (route) => {
            const json = multipleTransations;
            await route.fulfill({ json });
            
        });
        await page.getByText('Show All').click();

        for (let i = 0; i < multipleTransations.totalSize; i++) {
            const txn = multipleTransations.transaction[i];
            //const flag: boolean = (txn.isReverse === 'true' ? true : false)
            //const flag1: boolean = (txn.transactionType === 'MONEY_IN' ? true : false)
            const flag3 = (txn.isReverse === 'false' && txn.transactionType === 'MONEY_OUT' ? false : true)
            const row = page.locator(`text=${txn.transactionId}`).locator('..').locator('..').getByText(flag3 ? 'Credit' : 'Debit').locator('..');
            const amount = flag3 ? `${txn.transactionAmount} ${txn.billingCurrency}` : `-${txn.transactionAmount} ${txn.billingCurrency}`;
            await expect(row.getByText(txn.merchantName)).toBeVisible();
            await expect(row.getByText(amount)).toBeVisible();
            await expect(row.getByText(txn.transactionId)).toBeVisible();
        }
    })

    test('Multiple Transations with corrupted data', async ({ page }) => {
    await page.route('*/**/api/v1/agb/cards', async (route) => {
        const json = transationsCard;
        await route.fulfill({ json });
    });

    await page.route('*/**/api/v1/agb/cards/transactions/100000189902', async (route) => {

        const corrupted = JSON.parse(JSON.stringify(multipleTransations));

        if (corrupted.transaction[0]) {
            corrupted.transaction[0].transactionId = corrupted.transaction[0].transactionId.replace('7', '9');
        }
        await route.fulfill({ json: corrupted });
    });

    await page.getByText('Show All').click();


    for (let i = 0; i < multipleTransations.totalSize; i++) {
        const txn = multipleTransations.transaction[i];

        const flag3 = (txn.isReverse === 'false' && txn.transactionType === 'MONEY_OUT' ? false : true)
            const row = page.locator(`text=${txn.transactionId}`).locator('..').locator('..').getByText(flag3 ? 'Credit' : 'Debit').locator('..');
            const amount = flag3 ? `${txn.transactionAmount} ${txn.billingCurrency}` : `-${txn.transactionAmount} ${txn.billingCurrency}`;
            await expect(row.getByText(txn.merchantName)).toBeVisible();
            await expect(row.getByText(amount)).toBeVisible();
            await expect(row.getByText(txn.transactionId)).toBeVisible();
    }
    });


})
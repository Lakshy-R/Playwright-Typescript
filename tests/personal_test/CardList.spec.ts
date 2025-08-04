import {test, expect}  from '@playwright/test';
import testData from './test.json' assert { type: 'json' };
require('dotenv').config();
if(!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Please set USERNAME and PASSWORD in .env file');
}
const { USERNAME, PASSWORD } = process.env;



test.describe('Credit List', () => {
let numofcards = 0;
test('check number', async ({ page }) => {

        await page.route('*/**/api/v1/agb/cards', async (route) => {
      const json = [
    {
        "id": "100000189902",
        "cardMask": "442441******5555",
        "accountNumber": "71150090488",
        "cardNumber": "442441******5555",
        "availableBalance": 8939422.86,
        "holdBalance": 0.00,
        "currencyName": "USD",
        "backOfficeStatus": "Stolen card, capture",
        "status": "Valid card",
        "statusCode": "0",
        "statusName": "VALID CARD",
        "state": "Issued",
        "availableStatuses": [
            {
                "statusCode": "ReportLostOrStolen",
                "name": "Report Lost Stolen"
            },
            {
                "statusCode": "SetPin",
                "name": "Set Pin"
            }
        ],
        "cardholderName": "ELSAFI AA",
        "expirationDate": "02.2027",
        "expirDate": "02.2027",
        "seqNumber": "1",
        "nickname": null,
        "productNumber": "70000764",
        "virtual": null,
        "isSingleUse": null,
        "currencyCode": "840"
    }
];
      await route.fulfill({ json });
      
    });
    await page.goto('https://lib-app-c921f.web.app/auth/login');
    await page.getByPlaceholder('Enter your username').fill(USERNAME);
    await page.getByPlaceholder('Enter Password').fill(PASSWORD);
    await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
    await page.waitForNavigation(); 
    await page.waitForLoadState('networkidle')
    expect(page.getByText('Ending with ** 5555')).toBeVisible();
});

    test('check balance', async ({ page }) => {


        await page.route('*/**/api/v1/agb/cards', async (route) => {
      const json= testData;
      await route.fulfill({ json });
      numofcards = json.length;

    });
    await page.goto('https://lib-app-c921f.web.app/auth/login');
    await page.getByPlaceholder('Enter your username').fill(USERNAME);
    await page.getByPlaceholder('Enter Password').fill(PASSWORD);
    await page.click('div.is_Button._bg-0hover-c-primary6048._bg-0disabled-c-secondary50547._bg-0active-c-primary9548._dsp-flex._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._fd-row._jc-center._ai-center._btlr-t-radius-m._btrr-t-radius-m._bbrr-t-radius-m._bblr-t-radius-m._pt-t-space-m._pb-t-space-m._bg-c-primary8048._btc-c-transpare3526._brc-c-transpare3526._bbc-c-transpare3526._blc-c-transpare3526._cur-pointer._gap-t-space-xs._mt-t-space-m');
    await page.waitForNavigation(); 
    await page.waitForLoadState('networkidle')
    expect(page.locator('div.is_Button').nth(1)).toHaveAttribute('aria-disabled', 'true');
    for (let i = 0; i < numofcards-1; i++) {
        expect(page.locator('div.is_Button').nth(2)).not.toHaveAttribute('aria-disabled', 'true');
        await page.locator('div.is_Button').nth(2).click();
        if(i>0){
            expect(page.locator('div.is_Button').nth(1)).not.toHaveAttribute('aria-disabled', 'true');
        }
    }
    expect(page.locator('div.is_Button').nth(2)).toHaveAttribute('aria-disabled', 'true');
    await page.waitForLoadState('networkidle');

});
    
    
});

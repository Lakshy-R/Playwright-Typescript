import {expect, test} from '@playwright/test';

test.skip('example test', async ({page}) => {
    await page.goto('https://www.mymsc.com/myMSC?utm_medium=cpc&utm_source=google&utm_campaign=19650187642&utm_medium=cpc&utm_source=google&utm_campaign=19650187642&utm_medium=cpc&utm_source=google&utm_campaign=19650187642&utm_medium=cpc&utm_source=google&utm_campaign=19650187642&_ga=2.266883982.1693291210.1753609159-450252259.1753609159&_gl=1*vcaxi1*_up*MQ..*_gs*NQ..&gclid=EAIaIQobChMIieOUh9_cjgMVbOJJBx3JYwiGEAEYASAAEgI48fD_BwE&gclsrc=aw.ds');
    await page.getByRole('button', { name: 'Reject All' }).click();
    await page.getByRole('button', { name: 'EN' }).click();
    const rows = page.locator('.msc-navbar__languages').getByRole('listitem');
    const count = await rows.count();
    console.log(`Number of rows: ${count}`);
    for (let i = 0; i < count; ++i)
        console.log(await rows.nth(i).textContent());
});

test.skip("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});

import {test , expect} from '@playwright/test';

test.describe('Onboarding', () => {

    test('Create account', async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/login')
        expect(page)

        const signUpButton = page.getByText('Sign Up');
        
        await expect(signUpButton).toBeVisible();
        await expect(signUpButton).toBeEnabled();

        
        await signUpButton.click();
        await page.waitForURL('**/auth/register');
        expect(page.url()).toBe('https://lib-app-c921f.web.app/auth/register');
    })

    test('Verify "Submit" button not clickable when the card number is empty', async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/register');
        await page.waitForLoadState('networkidle');
        const nextButton = page.locator('div.is_Button:has-text("Next")');
        await expect(nextButton).toHaveAttribute('aria-disabled', 'true');


    })

    test('Verify "Submit" button is clickable when the card number is filled', async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/register');
        await page.waitForLoadState('networkidle');
        await page.getByPlaceholder('0000 0000 0000 0000').fill('1234567890123456');
        const nextButton = page.locator('div.is_Button:has-text("Next")');
        await expect(nextButton).not.toHaveAttribute('aria-disabled', 'true');
    })

    test('Verify "Submit" button not clickable when the card number is invalid less than 16 digits', async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/register');
        await page.waitForLoadState('networkidle');
        await page.getByPlaceholder('0000 0000 0000 0000').fill('12341233');
        const nextButton = page.locator('div.is_Button:has-text("Next")');
        await expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    })

    test('Verify Cannot enter special characters in the card number', async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/register');
        await page.waitForLoadState('networkidle');
        const cardNumberInput = page.getByPlaceholder('0000 0000 0000 0000');
        await cardNumberInput.fill('1234!@#$5678');
        const cardNumberValue = await cardNumberInput.inputValue();
        expect(page.getByText('Must be a number')).toBeVisible();
    })

    test('Verify an error message appear when entering existing card number', async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/register');
        await page.waitForLoadState('networkidle');
        await page.getByPlaceholder('0000 0000 0000 0000').fill('4424410054426508');
        await page.locator('div.is_Button:has-text("Next")').click();
        const nextButton = page.locator('div.is_Button:has-text("Next")');
        await expect(nextButton).not.toHaveAttribute('aria-disabled', 'true', { timeout: 5000 });
        expect(page.getByText('Customer already exist')).toBeVisible();
    })

    test('Bilingual - Verify an error message appear when entering card number not related to the institution', async ({ page }) => {
        await page.goto('https://lib-app-c921f.web.app/auth/register');
        await page.waitForLoadState('networkidle');
        await page.getByPlaceholder('0000 0000 0000 0000').fill('4900000000163728');
        await page.locator('div.is_Button:has-text("Next")').click();
        const nextButton = page.locator('div.is_Button:has-text("Next")');
        await expect(nextButton).not.toHaveAttribute('aria-disabled', 'true', { timeout: 5000 });
        expect(page.getByText('This card number does not exist on our system. Please enter a valid card number.')).toBeVisible();
    })

    test('Verify digit Keypad will appear when tapping on card number placeholder', async ({ page }) => {

        await page.goto('https://lib-app-c921f.web.app/auth/register');
        await page.waitForLoadState('networkidle');
        const cardInput = page.getByPlaceholder('0000 0000 0000 0000');
        await cardInput.click();
        await expect(cardInput).toBeFocused();

    })



})

import {test, expect} from '@playwright/test';

test.skip('Automation Form Submission', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    await newTodo.fill('Learn Playwright');
    await newTodo.press('Enter');
    
    await newTodo.fill('Write tests');
    await newTodo.press('Enter');
    
    const firstTodo = page.getByTestId('todo-item').nth(0)
    await firstTodo.getByRole('checkbox').check();

    const secondTodo = page.getByTestId('todo-item').nth(1);
    await expect(secondTodo).not.toHaveClass('completed');
    await expect(firstTodo).toHaveClass('completed');

});

test.skip('Handeling form' , async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const placeholder = '[placeholder="What needs to be done?"]';
    await page.fill(placeholder, 'Learn Playwright');
    await page.locator(placeholder).press('Enter');
    
    const checkbox = page.locator('.toggle');
    await checkbox.check();

})
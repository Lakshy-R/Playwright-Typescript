import {test , expect} from '@playwright/test';

test.describe('Variable Declaration and Types', () => {
    const selector = {
        firstName: '#firstName',
        age: '#age',
        student: '#isStudent',
    }
    test.skip('Declaration and Types', async ({ page }) => {

        let firstName: string = 'John';
        let age: number = 25;
        let isStudent: boolean = true;

        await page.goto('file:///C:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_7/index.html');   

        await page.fill(selector.firstName, firstName);
        await page.fill(selector.age, age.toString());
        await page.check(selector.student);

        await page.click('#applyData');

        expect(await page.textContent('#displayFirstName')).toBe(firstName)
        expect(await page.textContent('#displayAge')).toContain(age.toString())
        expect(await page.isChecked('#isStudent')).toBe(true);


    })
})

test.describe('Type Definitions and Interfaces', ()=>{

    type User = {
        firstName: string,
        age: number,
        isStudent: boolean,
    };

    const selectors = {
        firstName: '#firstName',
        age: '#age',
        student: '#isStudent'
    }

    let user: User = {
        firstName: 'Jane',
        age: 25,
        isStudent: true,
    }

    test.skip('Type Def and Interfaces', async ({page})=>{
        await page.goto('file:///C:/Users/laksh/Documents/GitHub/Playwright-Typescript/tests/workshop_7/index.html');   
        await page.fill(selectors.firstName, user.firstName);
        await page.fill(selectors.age, user.age.toString());
        await page.click('#applyData');

        expect(await page.textContent('#displayFirstName')).toBe(user.firstName)
        expect(await page.textContent('#displayAge')).toContain(user.age.toString())
        expect(await page.isChecked('#isStudent')).not.toBe(user.isStudent);

    })

})
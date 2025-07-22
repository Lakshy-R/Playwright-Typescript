import { Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
import { Input } from './Input';
import { Button } from './Button';

export class PageObject extends AbstractPage {
    button: Button;
    input: Input;
    readonly firstNameSelector: string = '#firstName'
    readonly ageSelector: string = '#age';
    readonly isStudentSelector: string = '#isStudent'; 
    readonly applyButtonSelector: string = '#applyData';
    readonly displayName: string = '#displayFirstName';
    readonly displayAge: string = '#displayAge';
    readonly displayIsStudent: string = '#displayIsStudent';

    constructor(page: Page) {
        super(page);
        this.button = new Button(page);
        this.input = new Input(page);
    }

    async open(url: string): Promise<void> {
        await this.page.goto(url);
    }
    
    async fillFirstName(firstName: string): Promise<void> {
        await this.input.fillInput(this.firstNameSelector, firstName);
    }

    async fillAge(age: string): Promise<void> {
        await this.input.fillInput(this.ageSelector, age);
    }

    async clickIsStudent(): Promise<void> {
        await this.page.click(this.isStudentSelector);
    }

    async clickApplyButton(): Promise<void> {
        await this.button.click(this.applyButtonSelector);
    }

    async getText(selector: string): Promise<string> {
        const element = this.page.textContent(selector);
        return await element || '';
    }
}
import { Page } from "@playwright/test";

export class Input {
    private page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async fillInput(selector: string, text: string): Promise<void> {
        const input = this.page.locator(selector);
        await input.fill(text);
    }

}
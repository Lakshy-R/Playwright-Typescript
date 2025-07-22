import { Page } from "@playwright/test";

export class Button {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async click(buttonSelector: string ): Promise<void> {
        await this.page.click(buttonSelector);
    }

}
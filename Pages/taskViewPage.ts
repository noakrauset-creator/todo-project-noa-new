import { Page, Locator } from '@playwright/test';

export class TaskView {
    readonly page: Page;
    readonly allTheTasksButton: Locator;
    readonly inCompletedTasksButton: Locator;
    readonly completedTasksButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allTheTasksButton = page.locator('#all');
        this.inCompletedTasksButton = page.locator('#incomplete');
        this.completedTasksButton = page.locator('#completed');
    }
    async clickAllTheTasksButton() {
        await this.allTheTasksButton.click();
    }
    async clickIncompletedTasksButton() {
        await this.inCompletedTasksButton.click();
    }
    async clickcompletedTasksButton() {
        await this.completedTasksButton.click();
    }
}

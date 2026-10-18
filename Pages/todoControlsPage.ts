import { Page, Locator } from '@playwright/test';

export class ToDoControlsPage {
    readonly page: Page;
    readonly completeAllTheTasksButton: Locator;
    readonly clearAllTheTasksButton: Locator;
    readonly tasksLeftCounter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeAllTheTasksButton = page.locator('#complete-all');
        this.clearAllTheTasksButton = page.locator('#clear-completed');
        this.tasksLeftCounter = page.getByText(/Tasks Left/i);
    }
    async clickCompleteAllTheTasks() {
        await this.completeAllTheTasksButton.click();
    }
    async clickClearAllTheCompletedTasks() {
        await this.clearAllTheTasksButton.click();
    }
    async getTasksLeftCount(): Promise<number> {
        await this.tasksLeftCounter.waitFor({ state: 'visible' });
        const text = await this.tasksLeftCounter.innerText();
        const count = parseInt(text.trim().split(' ')[0], 10);
        return isNaN(count) ? 0 : count;
    }
}

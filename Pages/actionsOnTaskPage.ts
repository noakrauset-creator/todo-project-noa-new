import { Page, Locator } from '@playwright/test';

export class ActionsOnTask {

    readonly page: Page;
    readonly tasksLocator: Locator;
    readonly completeTaskButtons: Locator;
    readonly removeTaskButtons: Locator;



    constructor(page: Page) {
        this.page = page;
        this.tasksLocator = page.locator('.task');
        this.completeTaskButtons = page.locator('div.checkbox a');
        this.removeTaskButtons = page.locator('div.delete, button.delete-btn');
    }

    getTaskItem(taskTitle: string): Locator {
        return this.tasksLocator.filter({ hasText: taskTitle });
    }

    getTaskCheckboxLink(taskTitle: string): Locator {
        return this.getTaskItem(taskTitle).locator(this.completeTaskButtons);
    }

    getTaskDeleteButton(taskTitle: string): Locator {
        return this.getTaskItem(taskTitle).locator(this.removeTaskButtons);
    }

    async deleteTask(taskTitle: string) {
        await this.getTaskDeleteButton(taskTitle).click();
    }

    async clickTaskCheckbox(taskTitle: string) {
        await this.getTaskCheckboxLink(taskTitle).click();
    }
}
import { Page, Locator } from '@playwright/test';
import { completeTaskButtons, removeTaskButtons,tasksLocator } from '../Helpers/constans';

export class ActionsOnTask {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getTaskItem(taskTitle: string): Locator {
        return this.page.locator(tasksLocator, { hasText: taskTitle});
    }

    getTaskCheckboxLink(taskTitle: string): Locator {
        return this.getTaskItem(taskTitle).locator(completeTaskButtons);
    }

    getTaskDeleteButton(taskTitle: string): Locator {
        return this.getTaskItem(taskTitle).locator(removeTaskButtons);
    }

    async deleteTask(taskTitle: string) {
        await this.getTaskDeleteButton(taskTitle).click();
    }

    async clickTaskCheckbox(taskTitle: string) {
        await this.getTaskCheckboxLink(taskTitle).click();
    }
}
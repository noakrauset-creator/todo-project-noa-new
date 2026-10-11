import { Page, Locator } from '@playwright/test';
import { completeTaskButtons,tasksLocator } from '../Helpers/constans';

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
    getTaskCheckboxLink(taskTitle: string): Locator {
        return this.page.locator(tasksLocator, { hasText: taskTitle }).locator(completeTaskButtons);
    }

}
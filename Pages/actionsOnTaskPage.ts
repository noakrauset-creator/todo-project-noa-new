import { Page, Locator, expect } from '@playwright/test';

export class ActionsOnTaskPage {
    readonly page: Page;
    readonly tasksLocator: Locator;
    readonly completeTaskButtons: Locator;
    readonly removeTaskButtons: Locator;
    readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tasksLocator = page.locator('.task');
        this.completeTaskButtons = page.locator('div.checkbox a');
        this.removeTaskButtons = page.locator('div.delete, button.delete-btn');
        this.title = this.tasksLocator.locator('div.text p:first-child');
    }

    getTaskItem(taskTitle: string): Locator {
        return this.tasksLocator.filter({ hasText: taskTitle });
    }
    async deleteTask(taskTitle: string) {
        await this.getTaskItem(taskTitle).locator(this.removeTaskButtons).click();
    }
    async clickTaskCheckbox(taskTitle: string) {
        await this.getTaskItem(taskTitle).locator(this.completeTaskButtons).click();
    }
    async expectTaskToBeVisible(taskTitle: string) {
        const createdTask = this.title.filter({ hasText: taskTitle });
        await expect(createdTask).toBeVisible();
    }
    async expectTaskToBeCompleted(taskTitle: string) {
        const checkboxLink = this.getTaskItem(taskTitle).locator(this.completeTaskButtons);
        await expect(checkboxLink).toHaveAttribute('href', /completed=true/);
    }
    async expectTaskToBeInCompleted(taskTitle: string) {
        const checkboxLink = this.getTaskItem(taskTitle).locator(this.completeTaskButtons);
        await expect(checkboxLink).toHaveAttribute('href', /completed=false/);
    }
    async expectTaskToBeHidden(taskTitle: string) {
        const taskContainer = this.getTaskItem(taskTitle).locator(this.completeTaskButtons);
        await expect(taskContainer).toBeHidden();
    }
    async expectTaskToHaveCountZero(taskTitle: string) {
        const taskContainer = this.getTaskItem(taskTitle).locator(this.completeTaskButtons);
        await expect(taskContainer).toHaveCount(0);
    }
}

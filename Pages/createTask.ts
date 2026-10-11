import { Page, Locator } from '@playwright/test';
import { priority, category } from '../Helpers/types';

export class CreateTask {

    readonly page: Page;
    readonly titleField: Locator;
    readonly descriptionField: Locator;
    readonly priorityField: Locator;
    readonly categoryField: Locator;
    readonly dueDateField: Locator;
    readonly submitButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.titleField = page.locator('#task');
        this.descriptionField = page.locator('#description');
        this.priorityField = page.locator('#priority');
        this.categoryField = page.locator('#category');
        this.dueDateField = page.locator('#date');
        this.submitButton = page.locator('#save');

    }
    async fillTitle(title: string) {
        await this.titleField.fill(title);
    }
    async fillDescription(description: string) {
        await this.descriptionField.fill(description);
    }
    async selectPriority(sortOptionsPriority: priority) {
        await this.priorityField.selectOption(sortOptionsPriority);
    }
    async selectCategory(sortOptionsCategory: category) {
        await this.categoryField.selectOption(sortOptionsCategory);
    }
    async fillDueDate(dateString: string) {
        await this.dueDateField.fill(dateString);
    }
    async submitClick() {
        await this.submitButton.click();
    }

}